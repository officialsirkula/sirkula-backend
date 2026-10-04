// =========================================================================
// SIRKULA BACKEND SERVER (server.js) - NODE.JS + EXPRESS + GEMINI AI VISION
// =========================================================================

const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// PENTING: Izinkan CORS agar bisa dipanggil dari Frontend Netlify/Vercel/Lokal
app.use(cors());

// PENTING: Limit json dinaikkan ke 15mb agar sanggup menerima foto kamera HP
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// KONFIGURASI API KEY & DATABASE GOOGLE SHEETS
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "ISI_GEMINI_API_KEY_DI_SINI";
const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzr2YFIfsp12S5G4iuoKd00gxZADa2BF93NhBCRijRCPX0s9vWVw6PYNI79efc1FU99Vg/exec";

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// MATRIKS HARGA SAMPAH & POIN SIRKULA (PORSI SISWA = 70%)
const SAMPAH_RATES = {
  "PET Bersih": { hargaPerKg: 5000, poinPerKg: 3500, pcsPerKg: 50, defaultGram: 20 },
  "PET Kotor":  { hargaPerKg: 2500, poinPerKg: 1750, pcsPerKg: 50, defaultGram: 20 },
  "LDPE > PP":  { hargaPerKg: 1000, poinPerKg: 700,  pcsPerKg: 250, defaultGram: 4 },
  "PET Warna":  { hargaPerKg: 800,  poinPerKg: 560,  pcsPerKg: 50, defaultGram: 20 }
};

// CHECK HEALTH SERVER
app.get('/', (req, res) => {
  res.send('Server Sirkula AI Vision Backend Aktif! 🚀');
});

// ENDPOINT 1: ANALISIS FOTO KEMASAN DENGAN GEMINI AI VISION
app.post('/api/analyze-waste', async (req, res) => {
  try {
    const { imageBase64, userCoords, userToggleCondition } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ status: 'error', message: 'Gambar foto kemasan tidak ditemukan' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Analisis foto kemasan sampah ini secara teliti untuk sistem waste tracking Sirkula.id:
      1. Identifikasi Merek FMCG (contoh: Danone, Indofood, Mayora, Unilever, ABC President, Nestlé, Wings, dll). Jika kurang jelas, tebak FMCG paling relevan di Indonesia.
      2. Identifikasi Nama Produk Spesifik (contoh: Aqua Botol 600ml, Teh Pucuk Harum 350ml, Indomie Goreng, dll).
      3. Klasifikasikan Jenis Material Sampah ke dalam SALAH SATU dari 4 kategori persis ini:
         - "PET Bersih" (Botol plastik bening/transparan tanpa tutup dan tanpa label plastik).
         - "PET Kotor" (Botol plastik bening/transparan yang masih ada label plastik atau tutupnya).
         - "PET Warna" (Botol plastik berwarna seperti Sprite hijau, Pocari Sweat, Hydro Coco).
         - "LDPE > PP" (Kemasan sachet, kantong plastik, pouch minyak/sabun/snack multilayer).
      4. Estimasi Jumlah Unit yang terlihat dalam foto (default minimal 1).
      
      Kembalikan HANYA format JSON valid tanpa tanda markdown:
      {
        "fmcg": "Nama FMCG",
        "namaProduk": "Nama Produk Spesifik",
        "jenisMaterial": "PET Bersih | PET Kotor | PET Warna | LDPE > PP",
        "jumlahUnit": 1
      }
    `;

    const base64Clean = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const imageParts = [
      {
        inlineData: {
          data: base64Clean,
          mimeType: "image/jpeg"
        }
      }
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text().trim();
    const cleanJsonString = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let aiParsed;
    try {
      aiParsed = JSON.parse(cleanJsonString);
    } catch (e) {
      aiParsed = {
        fmcg: "FMCG Brand",
        namaProduk: "Kemasan Daur Ulang",
        jenisMaterial: "PET Kotor",
        jumlahUnit: 1
      };
    }

    let finalMaterial = aiParsed.jenisMaterial || "PET Kotor";
    if (userToggleCondition === 'bersih' && finalMaterial === 'PET Kotor') {
      finalMaterial = 'PET Bersih';
    }

    const rateInfo = SAMPAH_RATES[finalMaterial] || SAMPAH_RATES["PET Kotor"];
    const qty = aiParsed.jumlahUnit || 1;
    const totalBeratGram = qty * rateInfo.defaultGram;
    const totalBeratKg = totalBeratGram / 1000;
    const totalPoin = Math.round(totalBeratKg * rateInfo.poinPerKg * 100) / 100;

    res.json({
      status: 'success',
      data: {
        fmcg: aiParsed.fmcg || "FMCG Brand",
        namaProduk: aiParsed.namaProduk || "Kemasan Daur Ulang",
        jenisMaterial: finalMaterial,
        jumlahUnit: qty,
        beratGram: totalBeratGram,
        poin: totalPoin > 0 ? totalPoin : (rateInfo.poinPerKg / rateInfo.pcsPerKg) * qty,
        location: userCoords || { lat: null, lng: null },
        rateDetails: {
          hargaPerKg: rateInfo.hargaPerKg,
          poinPerKg: rateInfo.poinPerKg,
          porsiSiswa: "70%"
        }
      }
    });

  } catch (err) {
    console.error("AI Analysis Error:", err);
    res.status(500).json({ status: 'error', message: 'Gagal menganalisis gambar oleh AI', error: err.message });
  }
});

// ENDPOINT 2: PROSES SIMPAN (AUTO UPLOAD DRIVE & GOOGLE SHEETS)
app.post('/api/submit-waste', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
      redirect: 'follow'
    });

    const resText = await response.text();
    let resJson;
    try {
      resJson = JSON.parse(resText);
    } catch (e) {
      resJson = { status: 'success', message: 'Data terkirim ke Sheets' };
    }

    res.json({ status: 'success', result: resJson });
  } catch (err) {
    console.error("Submit Error:", err);
    res.status(500).json({ status: 'error', message: 'Gagal menyimpan ke Dashboard Google Sheets' });
  }
});

// PORT PORTABLE UNTUK RENDER & LOKAL
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sirkula AI Server running on port ${PORT}`));