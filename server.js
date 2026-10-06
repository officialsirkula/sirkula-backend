const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzr2YFIfsp12S5G4iuoKd00gxZADa2BF93NhBCRijRCPX0s9vWVw6PYNI79efc1FU99Vg/exec";

const SAMPAH_RATES = {
  "PET Bersih": { poinPerKg: 3500, defaultGram: 20 },
  "PET Kotor":  { poinPerKg: 1750, defaultGram: 20 },
  "LDPE > PP":  { poinPerKg: 700,  defaultGram: 4 },
  "PET Warna":  { poinPerKg: 560,  defaultGram: 20 }
};

app.get('/', (req, res) => {
  res.send('Server Sirkula AI Vision Backend Aktif! 🚀');
});

app.post('/api/analyze-waste', async (req, res) => {
  try {
    const { imageBase64, userCoords, userToggleCondition } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ status: 'error', message: 'Gambar foto kemasan tidak ditemukan' });
    }

    const base64Clean = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const promptText = `Tugasmu adalah menganalisis foto sampah ini secara akurat berdasarkan apa yang benar-benar kamu lihat:
    1. Identifikasi Merek FMCG asli (contoh: Danone/Aqua, Indofood, Mayora, Unilever, Otsuka).
    2. Identifikasi Nama Produk Spesifik (contoh: Aqua Botol 600ml, Teh Pucuk Harum, Indomie Goreng).
    3. Klasifikasikan Material (PILIH SATU SAJA): "PET Bersih", "PET Kotor", "PET Warna", atau "LDPE > PP".
    4. Estimasi Jumlah Unit yang terlihat dalam foto.
    
    KELUARKAN HANYA FORMAT JSON MENTAH TANPA MARKDOWN:
    {
      "fmcg": "Nama FMCG",
      "namaProduk": "Nama Produk",
      "jenisMaterial": "PET Kotor",
      "jumlahUnit": 1
    }`;

    // Menggunakan model Gemini 1.5 Flash resmi (sangat akurat baca teks)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const geminiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: promptText },
            { inline_data: { mime_type: "image/jpeg", data: base64Clean } }
          ]
        }]
      })
    });

    const geminiData = await geminiResponse.json();

    // Jika kuota habis, lebih baik jujur minta input manual daripada ngasih data acak yang salah
    if (!geminiResponse.ok) {
      console.warn("API Error:", geminiData.error?.message);
      return res.status(429).json({ 
        status: 'error', 
        message: 'AI sedang sibuk atau kuota habis. Silakan klik "Batal" dan gunakan form Setor Manual.' 
      });
    }

    const candidateText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const cleanJsonString = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonMatch = cleanJsonString.match(/\{[\s\S]*\}/);

    if (!jsonMatch) throw new Error("Format AI tidak terbaca");

    const aiParsed = JSON.parse(jsonMatch[0]);

    let finalMaterial = aiParsed.jenisMaterial || "PET Kotor";
    if (userToggleCondition === 'bersih' && finalMaterial === 'PET Kotor') {
      finalMaterial = 'PET Bersih';
    }

    const rateInfo = SAMPAH_RATES[finalMaterial] || SAMPAH_RATES["PET Kotor"];
    const qty = parseInt(aiParsed.jumlahUnit) || 1;
    const totalBeratGram = qty * rateInfo.defaultGram;
    const totalPoin = Math.round((totalBeratGram / 1000) * rateInfo.poinPerKg * 100) / 100;

    res.json({
      status: 'success',
      data: {
        fmcg: aiParsed.fmcg || "Produk Konsumen",
        namaProduk: aiParsed.namaProduk || "Kemasan Daur Ulang",
        jenisMaterial: finalMaterial,
        jumlahUnit: qty,
        beratGram: totalBeratGram,
        poin: totalPoin > 0 ? totalPoin : 10,
        location: userCoords || { lat: null, lng: null }
      }
    });

  } catch (err) {
    console.error("Server Error:", err);
    res.status(500).json({ status: 'error', message: 'Gagal memproses gambar. Pastikan foto jelas.' });
  }
});

app.post('/api/submit-waste', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const resText = await response.text();
    let resJson;
    try { resJson = JSON.parse(resText); } catch (e) { resJson = { status: 'success', message: 'Data terkirim' }; }
    res.json({ status: 'success', result: resJson });
  } catch (err) {
    res.status(500).json({ status: 'error', message: 'Gagal menyimpan ke Dashboard' });
  }
});

module.exports = app;
if (process.env.NODE_ENV !== 'production') {
  app.listen(3000, () => console.log(`Sirkula Server running`));
}