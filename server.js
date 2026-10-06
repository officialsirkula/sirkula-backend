const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzr2YFIfsp12S5G4iuoKd00gxZADa2BF93NhBCRijRCPX0s9vWVw6PYNI79efc1FU99Vg/exec";

const SAMPAH_RATES = {
  "PET Bersih": { poinPerKg: 3500, defaultGram: 20 },
  "PET Kotor":  { poinPerKg: 1750, defaultGram: 20 },
  "LDPE > PP":  { poinPerKg: 700,  defaultGram: 4 },
  "PET Warna":  { poinPerKg: 560,  defaultGram: 20 }
};

app.get('/', (req, res) => res.send('Server Sirkula Groq AI Vision Aktif! 🚀'));

app.post('/api/analyze-waste', async (req, res) => {
  try {
    const { imageBase64, userCoords, userToggleCondition } = req.body;
    if (!imageBase64) return res.status(400).json({ status: 'error', message: 'Gambar tidak ditemukan' });

    const base64Clean = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const promptText = `Tugasmu adalah menganalisis botol/kemasan sampah di foto ini secara akurat:
    1. Baca dan Identifikasi Merek FMCG (contoh: Danone/Aqua, Indofood, Unilever, Mayora, Otsuka).
    2. Baca Nama Produk Spesifik (contoh: Aqua Botol 600ml, Teh Pucuk Harum, Indomie Goreng).
    3. Klasifikasikan Material: pilih HANYA salah satu ("PET Bersih", "PET Kotor", "PET Warna", "LDPE > PP").
    4. Estimasi Jumlah Unit yang terlihat di foto.
    
    KELUARKAN HANYA BENTUK JSON MENTAH TANPA MARKDOWN, TANPA PENJELASAN LAIN. CONTOH:
    {"fmcg":"Nama Merek", "namaProduk":"Nama Produk", "jenisMaterial":"PET Kotor", "jumlahUnit":1}`;

    const groqUrl = 'https://api.groq.com/openai/v1/chat/completions';
    
    // Menggunakan nama model Llama 3.2 Vision versi stabil (tanpa -preview)
    const groqResponse = await fetch(groqUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.2-90b-vision",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: promptText },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Clean}` } }
            ]
          }
        ],
        temperature: 0.1
      })
    });

    const groqData = await groqResponse.json();

    if (!groqResponse.ok) {
      throw new Error(groqData.error?.message || "Gagal menghubungi server Groq AI");
    }

    const candidateText = groqData.choices?.[0]?.message?.content || "{}";
    const cleanJsonString = candidateText.replace(/```json/g, '').replace(/```/g, '').trim();
    const jsonMatch = cleanJsonString.match(/\{[\s\S]*\}/);

    let aiParsed = {
      fmcg: "Produk Konsumen Umum",
      namaProduk: "Kemasan Daur Ulang",
      jenisMaterial: "PET Kotor",
      jumlahUnit: 1
    };

    if (jsonMatch) {
      try {
        aiParsed = JSON.parse(jsonMatch[0]);
      } catch (e) {
        console.warn("Gagal parse JSON:", e);
      }
    }

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
        fmcg: aiParsed.fmcg || "Produk Konsumen Umum",
        namaProduk: aiParsed.namaProduk || "Kemasan Daur Ulang",
        jenisMaterial: finalMaterial,
        jumlahUnit: qty,
        beratGram: totalBeratGram,
        poin: totalPoin > 0 ? totalPoin : 10,
        location: userCoords || { lat: null, lng: null }
      }
    });

  } catch (err) {
    console.error("Server Critical Error:", err);
    res.status(500).json({ status: 'error', message: 'Gagal memproses AI: ' + err.message });
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
  app.listen(3000, () => console.log(`Sirkula Groq Server running`));
}