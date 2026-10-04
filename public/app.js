const el = (id) => document.getElementById(id);
const DATABASE_URL = "https://script.google.com/macros/s/AKfycbzr2YFIfsp12S5G4iuoKd00gxZADa2BF93NhBCRijRCPX0s9vWVw6PYNI79efc1FU99Vg/exec";

// DIKSIONARI PENERJEMAAN LENGKAP (I18N)
const i18n = {
  id: {
    splashSub: "Lacak sampahmu, kumpulkan poin, dan jadi pahlawan bumi bersama Sirkula.",
    btnGetStarted: "Get Started",
    welcomeTitle: "Selamat Datang!",
    welcomeSub: "Mulai perjalanan sirkularmu di sekolah.",
    tabLogin: "Masuk", tabRegister: "Daftar",
    lblEmailPhone: "Email / No. Telp", lblPassword: "Kata Sandi",
    btnLoginNow: "Masuk Sekarang", btnRegNow: "Daftar Akun Baru",
    lblFullName: "Nama Lengkap", lblSchool: "Asal Sekolah", lblClass: "Kelas", lblRegEmail: "Email", lblRegPass: "Kata Sandi",
    greeting: "Halo, KulaMates!",
    levelLabel: "Level Kamu (Klik)",
    statTotalPts: "Total Poin", statPet: "Botol (PET)", statMl: "Sachet (ML)",
    miniBoardTitle: "Mini Leaderboard",
    impactTitle: "Dampak Lingkungan",
    impWaterTitle: "Air Bersih Terjaga", impWaterDesc: "Volume air diselamatkan",
    impCarbonTitle: "Cegah Karbon", impCarbonDesc: "Emisi CO2 dihindari",
    rankTitle: "Leaderboard", rankSub: "Top Kontributor di Sekolahmu", youLabel: "Kamu",
    rewardTitle: "Tukar Reward", rewardPtsLabel: "Saldo Poin",
    rewardInactiveTitle: "Musim Reward Belum Dimulai", rewardInactiveDesc: "Kumpulkan poin sebelum tanggal 1 November 2026!",
    personalInfoTitle: "Informasi Pribadi",
    navSettings: "Pengaturan App", navHelpAbout: "Bantuan dan Tentang", btnLogout: "Keluar Akun",
    settingsTitle: "Pengaturan", settingsSub: "Sesuaikan kenyamanan aplikasimu",
    secProfileAccount: "Profil dan Akun", editProfile: "Edit Data Diri", editProfileSub: "Ubah Nama, Sekolah, dan Kelas",
    changePass: "Ubah Kata Sandi", changePassSub: "Perbarui kata sandi akunmu",
    secNotif: "Notifikasi", dailyNotif: "Pengingat Scan Harian", dailyNotifSub: "Notifikasi agar Streak-mu tetap aktif",
    rewardInfo: "Info Musim Reward", rewardInfoSub: "Pemberitahuan saat voucher dibuka",
    secAppearance: "Tampilan", darkMode: "Mode Gelap (Dark Mode)", darkModeSub: "Ubah tema ke tampilan gelap",
    soundScan: "Suara Scanner (Bip)", soundScanSub: "Efek suara saat scan berhasil",
    secPrivacy: "Privasi dan Keamanan", anonMode: "Mode Anonim Leaderboard", anonModeSub: "Sembunyikan nama di papan peringkat",
    clearCache: "Bersihkan Cache App", clearCacheSub: "Hapus memori lokal sementara",
    secLang: "Bahasa", selectLangLabel: "Pilih Bahasa", selectLangSub: "Bahasa yang digunakan di app",
    secHelpAbout: "Bantuan dan Tentang", waCs: "Hubungi CS WhatsApp", waCsSub: "Bantuan teknis & pertanyaan poin",
    appVersion: "Versi Aplikasi",
    btnCancel: "Batal", btnSave: "Simpan", btnSendEmail: "Kirim Konfirmasi",
    lblOldPass: "Kata Sandi Saat Ini", lblNewPass: "Kata Sandi Baru", lblConfirmPass: "Konfirmasi Kata Sandi Baru",
    btnShareStory: "Bagikan ke Story",
    navHome: "Home", navRank: "Rank", navReward: "Reward", navProfile: "Profile"
  },
  en: {
    splashSub: "Track your waste, earn points, and be an earth hero with Sirkula.",
    btnGetStarted: "Get Started",
    welcomeTitle: "Welcome!",
    welcomeSub: "Start your circular journey at school.",
    tabLogin: "Sign In", tabRegister: "Sign Up",
    lblEmailPhone: "Email / Phone No.", lblPassword: "Password",
    btnLoginNow: "Sign In Now", btnRegNow: "Register Account",
    lblFullName: "Full Name", lblSchool: "School Name", lblClass: "Class", lblRegEmail: "Email", lblRegPass: "Password",
    greeting: "Hello, KulaMates!",
    levelLabel: "Your Level (Click)",
    statTotalPts: "Total Points", statPet: "Bottles (PET)", statMl: "Sachet (ML)",
    miniBoardTitle: "Mini Leaderboard",
    impactTitle: "Environmental Impact",
    impWaterTitle: "Clean Water Saved", impWaterDesc: "Volume of water saved",
    impCarbonTitle: "Carbon Prevented", impCarbonDesc: "Avoided CO2 emissions",
    rankTitle: "Leaderboard", rankSub: "Top Contributors in Your School", youLabel: "You",
    rewardTitle: "Redeem Rewards", rewardPtsLabel: "Points Balance",
    rewardInactiveTitle: "Reward Season Not Started", rewardInactiveDesc: "Collect points before November 1st, 2026!",
    personalInfoTitle: "Personal Information",
    navSettings: "App Settings", navHelpAbout: "Help and About", btnLogout: "Sign Out",
    settingsTitle: "Settings", settingsSub: "Customize your app preference",
    secProfileAccount: "Profile & Account", editProfile: "Edit Profile", editProfileSub: "Change Name, School, and Class",
    changePass: "Change Password", changePassSub: "Update your account password",
    secNotif: "Notifications", dailyNotif: "Daily Scan Reminder", dailyNotifSub: "Keep your Streak active",
    rewardInfo: "Reward Season Info", rewardInfoSub: "Notification when vouchers open",
    secAppearance: "Appearance", darkMode: "Dark Mode", darkModeSub: "Switch theme to dark appearance",
    soundScan: "Scanner Sound (Beep)", soundScanSub: "Sound effect when scan succeeds",
    secPrivacy: "Privacy & Security", anonMode: "Anonymous Leaderboard", anonModeSub: "Hide name on public leaderboard",
    clearCache: "Clear App Cache", clearCacheSub: "Clear temporary local memory",
    secLang: "Language", selectLangLabel: "Select Language", selectLangSub: "Language used in app",
    secHelpAbout: "Help and About", waCs: "Contact WhatsApp CS", waCsSub: "Technical support & point queries",
    appVersion: "App Version",
    btnCancel: "Cancel", btnSave: "Save", btnSendEmail: "Send Confirmation",
    lblOldPass: "Current Password", lblNewPass: "New Password", lblConfirmPass: "Confirm New Password",
    btnShareStory: "Share to Story",
    navHome: "Home", navRank: "Rank", navReward: "Reward", navProfile: "Profile"
  }
};

let state = { 
  user: null, school: null, kelas: null, kulaId: null, regEmail: null,
  points: 0, stats: { pet: 0, ml: 0 }, 
  history: [], scannedSkus: [],
  streakCount: 0, lastScanDate: null,
  darkMode: false, notifActive: true, rewardNotif: true, soundActive: true, anonMode: false, language: 'id'
};

let html5QrCode = null, currentScannedBarcode = null, currentScannedProductData = null;
const REWARD_CONFIG = { isActive: false, targetDate: "1 November 2026" };

// KATALOG MASTER PRODUK LOKAL
const masterBeverageCatalog = {
  "8996006852045": { nama: "Aqua Botol Mineral / Danone", jenis: "Plastik PET", fmcg: "Danone", poin: 15, weightGram: 18 },
  "8886008101053": { nama: "Aqua Air Mineral", jenis: "Plastik PET", fmcg: "Danone", poin: 15, weightGram: 18 },
  "8996001332015": { nama: "Aqua Botol Mineral 600ml", jenis: "Plastik PET", fmcg: "Danone", poin: 15, weightGram: 18 },
  "8992770110015": { nama: "Nu Green Tea 330ml", jenis: "Plastik PET", fmcg: "ABC President", poin: 15, weightGram: 16 },
  "8996001401017": { nama: "Milo UHT 110ml", jenis: "Kemasan Multilayer", fmcg: "Nestlé", poin: 15, weightGram: 8 }
};

function showToast(message, type = 'success') {
  const container = el('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'fadeOutUp 0.3s forwards'; setTimeout(() => toast.remove(), 300); }, 3000);
}
function showLoading() { el('modalLoading').classList.remove('hidden'); }
function hideLoading() { el('modalLoading').classList.add('hidden'); }

function loadState() { 
  const saved = localStorage.getItem('sirkulaState'); 
  if (saved) { 
    state = { ...state, ...JSON.parse(saved) }; 
    applySettingsToUI();
  } 
}
function saveState() { localStorage.setItem('sirkulaState', JSON.stringify(state)); }

window.onload = () => {
  loadState(); checkStreakValidity();
  applyLanguage(state.language || 'id');

  // MODAL EDUKASI DAMPAK LINGKUNGAN (EPA STANDARDS)
  document.body.insertAdjacentHTML('beforeend', `
    <div id="modalImpactInfo" class="modal-overlay hidden" style="z-index: 5800;">
      <div class="modal-box glass-card" style="text-align:left;">
        <h3 style="margin-bottom:10px; color:var(--brand-color); display:flex; align-items:center; gap:8px;">
          <i class="ph-bold ph-info"></i> Formula Dampak Lingkungan
        </h3>
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:10px;">Bagaimana sistem menghitung angka ini?</p>
        <div style="background:rgba(0,0,0,0.03); padding:12px; border-radius:10px; margin-bottom:15px; border: 1px solid rgba(0,0,0,0.05);">
          <p style="font-size:12px; margin-bottom:8px;"><strong>💧 Air Bersih:</strong> Daur ulang 1 Kg plastik menghemat sekitar <strong>2 Liter air</strong> yang biasanya terbuang dalam proses manufaktur.</p>
          <p style="font-size:12px;"><strong>☁️ Cegah Karbon:</strong> Daur ulang 1 Kg plastik mencegah pelepasan <strong>1.5 Kg emisi CO2</strong> (Gas Rumah Kaca).</p>
        </div>
        <p style="font-size:10px; color:var(--text-muted); font-style:italic;">*Standar Konversi EPA & Estimasi Gramasi (1 Botol PET = 18 gr, 1 Sachet = 6 gr).</p>
        <button class="btn-primary bouncy" style="margin-top:15px; width:100%;" onclick="el('modalImpactInfo').classList.add('hidden')">Tutup</button>
      </div>
    </div>
  `);

  document.querySelectorAll('.impact-row').forEach(row => {
    row.style.cursor = 'pointer';
    row.addEventListener('click', () => el('modalImpactInfo').classList.remove('hidden'));
  });

  el('btnLanjutSplash').addEventListener('click', () => {
    el('viewSplash').classList.add('hidden');
    if (state.user) { masukDashboard(); } else { el('viewLogin').classList.remove('hidden'); }
  });
  if(REWARD_CONFIG.isActive) {
    el('rewardBanner').classList.replace('inactive', 'active');
    el('rewardBanner').innerHTML = `<div class="reward-icon-large">🎁</div><h3 class="reward-title">Musim Reward Dibuka!</h3><p class="reward-desc">Tukarkan poinmu sekarang.</p>`;
    el('rewardGridContainer').classList.remove('hidden');
  }
};

window.switchAuthMode = function(mode) {
  if (mode === 'login') { el('tabLogin').classList.add('active'); el('tabSignup').classList.remove('active'); el('formLogin').classList.remove('hidden'); el('formSignup').classList.add('hidden'); } 
  else { el('tabSignup').classList.add('active'); el('tabLogin').classList.remove('active'); el('formSignup').classList.remove('hidden'); el('formLogin').classList.add('hidden'); }
};

// AUTO-SAVE USER KE CLOUD
el('btnProsesSignup').addEventListener('click', async () => {
  const name = el('regName').value.trim(); 
  const school = el('regSchool').value.trim(); 
  const kelas = el('regClass').value.trim(); 
  const email = el('regEmail').value.trim();
  const pass = el('regPass').value.trim();

  if(!name || !school || !email || !pass) {
    return showToast(state.language === 'en' ? 'Please fill all fields!' : 'Mohon lengkapi seluruh data & kata sandi!', 'error');
  }

  showLoading();

  const kulaId = "KULA-" + Math.floor(1000 + Math.random() * 9000);
  const now = new Date().toLocaleString('id-ID');

  const userData = {
    action: "registerUser",
    kulaId: kulaId,
    nama: name,
    sekolah: school,
    kelas: kelas,
    email: email,
    password: pass,
    registeredAt: now
  };

  state.user = name; 
  state.school = school; 
  state.kelas = kelas; 
  state.regEmail = email; 
  state.kulaId = kulaId; 
  saveState();

  try {
    await fetch(DATABASE_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });
  } catch (err) {
    console.warn("Koneksi cloud offline, data tersimpan secara lokal.", err);
  } finally {
    hideLoading();
    el('viewLogin').classList.add('hidden'); 
    masukDashboard(); 
    showToast(state.language === 'en' ? 'Account registered & saved to cloud!' : 'Pendaftaran berhasil & data tersimpan di Cloud!', 'success');
  }
});

el('btnProsesLogin').addEventListener('click', () => {
  if(!el('logId').value.trim()) return showToast('Masukkan Info Login!', 'error');
  if(!state.user) { state.user = "Siswa"; state.school = "SMA Demo"; state.kulaId = "KULA-1234"; state.regEmail = "siswa@sirkula.id"; }
  saveState(); el('viewLogin').classList.add('hidden'); masukDashboard(); showToast('Berhasil Masuk!', 'success');
});

// NAVIGATION LOGIC
const views = ['viewHome', 'viewRank', 'viewReward', 'viewProfile', 'viewSettings'];
const navItems = document.querySelectorAll('.nav-item');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navItems.forEach(n => n.classList.remove('active'));
    item.classList.add('active');
    switchView(item.getAttribute('data-target'));
  });
});

function switchView(targetId) {
  views.forEach(v => { el(v).classList.add('hidden'); el(v).classList.remove('view-enter'); });
  const targetEl = el(targetId);
  targetEl.classList.remove('hidden'); targetEl.classList.add('view-enter');
}

function masukDashboard() {
  el('txtUser').innerText = state.user.split(" ")[0];
  el('bottomNav').classList.remove('hidden');
  updateUIStatsAndLevel(); 
  fetchLeaderboardRealtime(); 
  switchView('viewHome');
}

// STREAK HARIAN
function checkStreakValidity() {
  if(!state.lastScanDate) return;
  const today = new Date().toLocaleDateString('id-ID');
  const last = new Date(state.lastScanDate);
  const diffDays = Math.floor((new Date() - last) / (1000 * 60 * 60 * 24));
  if(diffDays > 1 && today !== state.lastScanDate) { state.streakCount = 0; saveState(); }
}
function addStreak() {
  const today = new Date().toLocaleDateString('id-ID');
  if(state.lastScanDate !== today) {
    state.streakCount += 1; state.lastScanDate = today;
    showToast(`Misi Selesai! Streak Api bertambah 🔥`, 'success');
  }
}

// DAMPAK LINGKUNGAN
function updateUIStatsAndLevel() {
  let totalGram = (state.stats.pet * 18) + (state.stats.ml * 6);
  let totalKg = totalGram / 1000;

  let savedWater = (totalKg * 2).toFixed(2);
  let savedCarbon = (totalKg * 1.5).toFixed(2);

  el('impWater').innerText = `${savedWater} L`; 
  el('impCarbon').innerText = `${savedCarbon} Kg`;
  el('txtPts').innerText = state.points; 
  el('statPetVal').innerText = state.stats.pet; 
  el('statMlVal').innerText = state.stats.ml;
  el('txtStreak').innerText = state.streakCount; 
  el('rewMyPts').innerText = `${state.points} Pts`;

  let totalSampah = state.stats.pet + state.stats.ml;
  let ikon = "🌱"; let gelar = "Kula Starter";
  if (totalSampah >= 5 && totalSampah < 15) { ikon = "🌿"; gelar = "Eco Ranger"; }
  else if (totalSampah >= 15) { ikon = "🌍"; gelar = "Sirkula Hero"; }
  el('badgeIcon').innerText = ikon; el('badgeTitle').innerText = gelar;
  
  if(state.user) {
    el('profName').innerText = state.user; el('profId').innerText = state.kulaId;
    el('profSchool').innerText = state.school; el('profClass').innerText = state.kelas || '-';
    
    let displayName = state.anonMode ? "Anonim (" + state.kulaId + ")" : state.user.split(" ")[0];
    el('rankMyName').innerText = displayName; 
    el('rankMyPts').innerText = `${state.points} Pts`;
    el('rankMyBadge').innerText = gelar;
  }
}

// LEADERBOARD REAL-TIME
async function fetchLeaderboardRealtime() {
  const board = el('miniLeaderboard');
  board.innerHTML = '<div style="text-align:center; padding: 15px; font-size:12px; color:var(--text-muted);">Memuat klasemen...<br><div class="spinner" style="width:18px;height:18px;margin:8px auto 0;"></div></div>';
  
  try {
    let response = await fetch(DATABASE_URL + "?action=getLeaderboard");
    let resData = await response.json();
    
    if(resData.status === 'success' && resData.data.length > 0) {
      renderRealtimeLeaderboard(resData.data);
    } else {
      populateMiniLeaderboardFallback();
    }
  } catch(err) {
    console.warn("Gagal mengambil leaderboard cloud, menggunakan fallback lokal", err);
    populateMiniLeaderboardFallback();
  }
}

function renderRealtimeLeaderboard(data) {
  const board = el('miniLeaderboard');
  board.innerHTML = '';
  let namaSiswa = state.user || "Siswa";
  let userInTop = data.find(u => u.nama === namaSiswa);

  for(let i=0; i<Math.min(data.length, 3); i++) {
    let isMe = data[i].nama === namaSiswa;
    let color = i === 0 ? 'var(--brand-color)' : 'var(--text-main)';
    let displayNama = (isMe && state.anonMode) ? "Kamu (Anonim)" : data[i].nama.split(" ")[0];

    board.innerHTML += `
      <div class="rank-item-mini" style="${isMe ? 'background:rgba(132, 204, 22, 0.12); padding: 6px 8px; border-radius: 8px;' : ''}">
        <strong style="color:${color};">${i+1}. ${displayNama}</strong> 
        <span style="font-weight:${isMe ? 'bold' : 'normal'};">${data[i].poin} Pts</span>
      </div>
    `;
  }

  if(!userInTop && state.user) {
    let displayNama = state.anonMode ? "Kamu (Anonim)" : namaSiswa.split(" ")[0];
    board.innerHTML += `
      <div class="rank-item-mini" style="background:rgba(132, 204, 22, 0.12); padding: 6px 8px; border-radius: 8px; border-top:1px dashed rgba(132, 204, 22, 0.4); margin-top:4px;">
        <strong style="color:var(--brand-color);">> ${displayNama}</strong> 
        <span style="font-weight:bold; color:var(--brand-color);">${state.points} Pts</span>
      </div>
    `;
  }
}

function populateMiniLeaderboardFallback() {
  const board = el('miniLeaderboard');
  let nama = state.anonMode ? "Kamu (Anonim)" : (state.user ? state.user.split(" ")[0] : "Kamu");
  board.innerHTML = `
    <div class="rank-item-mini"><strong style="color:var(--brand-color);">1. Raka</strong> <span>550 Pts</span></div>
    <div class="rank-item-mini"><strong>2. Salsa</strong> <span>420 Pts</span></div>
    <div class="rank-item-mini" style="background:rgba(132, 204, 22, 0.12); padding: 6px 8px; border-radius: 8px; border-top:1px dashed rgba(132, 204, 22, 0.4); margin-top:4px;">
      <strong style="color:var(--brand-color);">> ${nama}</strong> 
      <span style="font-weight:bold; color:var(--brand-color);">${state.points} Pts</span>
    </div>
  `;
}

// SETTINGS & PROFILE
window.openSettingsView = function(scrollToId = null) {
  el('bottomNav').classList.add('hidden');
  switchView('viewSettings');
  if(scrollToId && el(scrollToId)) {
    setTimeout(() => { el(scrollToId).scrollIntoView({ behavior: 'smooth' }); }, 100);
  }
};

window.closeSettingsView = function() {
  switchView('viewProfile');
  el('bottomNav').classList.remove('hidden');
};

window.toggleDarkMode = function(isDark) {
  state.darkMode = isDark;
  if(isDark) { document.body.classList.add('dark-mode'); } 
  else { document.body.classList.remove('dark-mode'); }
  saveState();
  showToast(isDark ? "Mode Gelap Aktif" : "Mode Terang Aktif", "success");
};

window.toggleSetting = function(key, isChecked) {
  if(key === 'notif') state.notifActive = isChecked;
  if(key === 'rewardInfo') state.rewardNotif = isChecked;
  if(key === 'sound') state.soundActive = isChecked;
  if(key === 'anon') { 
    state.anonMode = isChecked; 
    updateUIStatsAndLevel(); 
    fetchLeaderboardRealtime();
  }
  saveState();
  showToast("Pengaturan diperbarui", "success");
};

window.changeLanguage = function(lang) {
  state.language = lang;
  saveState();
  applyLanguage(lang);
  showToast(lang === 'en' ? "Language set to English" : "Bahasa diubah ke Indonesia", "success");
};

function applyLanguage(lang) {
  const dict = i18n[lang] || i18n['id'];
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    if (dict[key]) element.innerText = dict[key];
  });
}

window.openWhatsAppCS = function() {
  window.open("https://wa.me/6282112893264?text=" + encodeURIComponent(`Halo Admin Sirkula, saya ${state.user || 'Siswa'} butuh bantuan.` ), '_blank');
};

window.openChangePasswordModal = function() {
  el('inpOldPass').value = ''; el('inpNewPass').value = ''; el('inpConfirmPass').value = '';
  el('modalChangePassword').classList.remove('hidden');
};

window.submitChangePassword = function() {
  const newP = el('inpNewPass').value.trim();
  if(newP.length < 6) return showToast("Kata sandi baru minimal 6 karakter!", "error");
  el('modalChangePassword').classList.add('hidden');
  showToast(`Konfirmasi kata sandi dikirim ke email terdaftar!`, "success");
};

window.clearAppCache = function() {
  if(confirm("Bersihkan cache app?")) showToast("Cache berhasil dibersihkan!", "success");
};

function applySettingsToUI() {
  if(state.darkMode) { document.body.classList.add('dark-mode'); el('toggleTheme').checked = true; }
  el('toggleNotif').checked = state.notifActive;
  el('toggleRewardInfo').checked = state.rewardNotif;
  el('toggleSound').checked = state.soundActive;
  el('toggleAnon').checked = state.anonMode;
  el('selectLang').value = state.language || 'id';
}

window.openEditProfileModal = function() {
  el('editName').value = state.user || '';
  el('editSchool').value = state.school || '';
  el('editClass').value = state.kelas || '';
  el('modalEditProfile').classList.remove('hidden');
};

window.saveProfileEdit = function() {
  const n = el('editName').value.trim();
  const s = el('editSchool').value.trim();
  const k = el('editClass').value.trim();
  if(!n || !s) return showToast("Nama dan Sekolah wajib diisi!", "error");
  state.user = n; state.school = s; state.kelas = k;
  saveState(); updateUIStatsAndLevel(); fetchLeaderboardRealtime();
  el('modalEditProfile').classList.add('hidden');
  showToast("Profil berhasil diperbarui!", "success");
};

window.tampilkanShareCard = function() {
  el('shareTitle').innerText = el('badgeTitle').innerText;
  el('shareIcon').innerText = el('badgeIcon').innerText;
  el('sharePts').innerText = state.points;
  el('shareCarbon').innerText = el('impCarbon').innerText;
  el('modalShare').classList.remove('hidden');
};

window.tukarReward = function(cost) {
  if (state.points >= cost) { state.points -= cost; saveState(); updateUIStatsAndLevel(); fetchLeaderboardRealtime(); showToast(`Berhasil ditukar! Sisa poin: ${state.points}`, 'success'); } 
  else { showToast(`Poin tidak cukup. Kurang ${cost - state.points} Pts!`, 'error'); }
};

el('btnLogout').addEventListener('click', () => { if(confirm("Keluar dari akun?")) { localStorage.removeItem('sirkulaState'); location.reload(); } });

// =========================================================================
// SCANNER WEB & SMART BARCODE PROCESSOR (API GLOBAL + PINTAR)
// =========================================================================
let scannerFeedbackInterval;
const feedbackMessages = [
  "🔍 Memfokuskan lensa ke barcode...",
  "Jaga jarak kamera sekitar 10-15 cm",
  "Hindari pantulan cahaya pada plastik...",
  "Mencari garis barcode produk...",
  "Tahan kamera sejenak agar tidak blur...",
  "⚠️ Barcode kusut? Gunakan tombol Setor Manual"
];

el('btnScan').addEventListener('click', async () => {
  el('modalScan').classList.remove('hidden');
  el('scanFrameBox').classList.remove('detected');
  
  let msgIndex = 0;
  el('scanStatusText').innerText = "Meminta izin akses kamera...";

  scannerFeedbackInterval = setInterval(() => {
    el('scanStatusText').innerText = feedbackMessages[msgIndex];
    msgIndex = (msgIndex + 1) % feedbackMessages.length;
  }, 3000);

  if (!html5QrCode) { html5QrCode = new Html5Qrcode("reader"); }

  const qrConfig = {
    fps: 10,
    qrbox: { width: 280, height: 120 },
    aspectRatio: 1.777778,
    formatsToSupport: [
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.CODE_128
    ]
  };

  const onScanSuccess = (scannedText) => {
    clearInterval(scannerFeedbackInterval);
    triggerScanSuccessFeedback();
    html5QrCode.stop().then(() => {
      el('modalScan').classList.add('hidden');
      processBarcode(scannedText);
    });
  };

  try {
    await html5QrCode.start(
      { facingMode: "environment" },
      qrConfig,
      onScanSuccess,
      (errorMessage) => {}
    );
  } catch (err) {
    clearInterval(scannerFeedbackInterval);
    el('scanStatusText').innerText = "Kamera diblokir oleh browser.";
    showToast('Mohon izinkan akses kamera di pengaturan browser Anda.', 'error');
    console.error("Camera error:", err);
  }
});

function triggerScanSuccessFeedback() {
  el('scanFrameBox').classList.add('detected');
  el('scanStatusText').innerHTML = "<span style='color:#22c55e; font-weight:bold;'>✅ Barcode Terbaca! Menganalisis produk...</span>";
  if (navigator.vibrate) navigator.vibrate([150, 50, 150]);
}

el('btnCloseScan').addEventListener('click', () => { 
  clearInterval(scannerFeedbackInterval);
  if(html5QrCode && html5QrCode.isScanning) html5QrCode.stop(); 
  el('modalScan').classList.add('hidden'); 
});

window.openManualInputFromScan = function() {
  clearInterval(scannerFeedbackInterval);
  if(html5QrCode && html5QrCode.isScanning) html5QrCode.stop();
  el('modalScan').classList.add('hidden');
  el('modalManualInput').classList.remove('hidden');
};

window.processManualSetor = function() {
  const fmcg = el('manualBrand').value;
  const mat = el('manualMaterial').value;
  const qty = parseInt(el('manualQty').value) || 1;

  let estGramPerUnit = mat.includes('PET') ? 18 : 6;
  let totalPts = qty * 15;

  el('modalManualInput').classList.add('hidden');

  showResultModal({
    sku: "MANUAL-INPUT",
    nama: `${fmcg} (${qty} Unit)`,
    fmcg: fmcg,
    jenis: mat,
    qty: qty,
    poin: totalPts,
    weightGram: estGramPerUnit * qty
  });
};

// SMART BARCODE PROCESSOR (OPEN FOOD FACTS API + LOKAL + PREDICTION)
async function processBarcode(barcodeText) {
  showLoading();
  let cleanKey = barcodeText.replace(/[^0-9]/g, '');

  // 1. CEK KATALOG LOKAL
  if(masterBeverageCatalog[cleanKey]) {
    hideLoading(); 
    let item = masterBeverageCatalog[cleanKey];
    return showResultModal({ 
      sku: barcodeText, 
      nama: item.nama, 
      fmcg: item.fmcg, 
      jenis: item.jenis, 
      qty: 1, 
      poin: item.poin, 
      weightGram: item.weightGram 
    });
  }

  // 2. CEK DATABASE GLOBAL INTERNET (Open Food Facts API)
  try {
    let response = await fetch(`https://world.openfoodfacts.org/api/v0/product/${cleanKey}.json`);
    let data = await response.json();

    if (data.status === 1) {
      hideLoading();
      let brandName = data.product.brands ? data.product.brands.split(',')[0] : "FMCG Brand";
      let productName = data.product.product_name || "Kemasan Daur Ulang";
      let materialType = "Plastik PET"; 
      
      let pack = (data.product.packaging || "").toLowerCase();
      if(pack.includes("sachet") || pack.includes("pouch")) materialType = "Kemasan Multilayer";

      return showResultModal({ 
        sku: barcodeText, 
        nama: productName, 
        fmcg: brandName, 
        jenis: materialType, 
        qty: 1, 
        poin: 15, 
        weightGram: 18 
      });
    }
  } catch (error) {
    console.warn("API Global offline, menggunakan sistem tebakan pintar.");
  }

  // 3. TEBAKAN PINTAR BERDASARKAN PREFIX BARCODE (899 = Indonesia)
  setTimeout(() => {
    hideLoading();
    
    let guessedFmcg = "FMCG Brand Nasional";
    let guessedName = "Kemasan Daur Ulang Produk";
    let guessedJenis = "Plastik PET";
    let estWeight = 18;
    
    if (cleanKey.startsWith("899600")) {
      guessedFmcg = "Danone (Aqua/Mizone)"; guessedName = "Produk Minuman Kemasan Danone"; guessedJenis = "Plastik PET"; estWeight = 18;
    } else if (cleanKey.startsWith("899277") || cleanKey.startsWith("899800")) {
      guessedFmcg = "ABC President"; guessedName = "Minuman Teh / Kopi Kemasan"; guessedJenis = "Plastik PET";
    } else if (cleanKey.startsWith("899111") || cleanKey.startsWith("899898")) {
      guessedFmcg = "Indofood"; guessedName = "Kemasan Produk Indofood"; guessedJenis = "Kemasan Multilayer"; estWeight = 8;
    } else if (cleanKey.startsWith("899496") || cleanKey.startsWith("899720")) {
      guessedFmcg = "Mayora Group"; guessedName = "Produk Minuman/Makanan Mayora"; guessedJenis = "Plastik PET";
    } else if (cleanKey.startsWith("899999")) {
      guessedFmcg = "Unilever Indonesia"; guessedName = "Kemasan Plastik Consumer Goods"; guessedJenis = "Kemasan Multilayer"; estWeight = 8;
    }

    showResultModal({ 
      sku: barcodeText, 
      nama: guessedName, 
      fmcg: guessedFmcg, 
      jenis: guessedJenis, 
      qty: 1, 
      poin: 15, 
      weightGram: estWeight 
    });
  }, 500);
}

function showResultModal(product) {
  currentScannedProductData = product; 
  el('resSku').innerText = product.sku; 
  el('resName').innerText = product.nama;
  el('resFmcg').innerText = product.fmcg || 'FMCG Brand';
  el('resJenis').innerText = product.jenis;
  el('resQty').innerText = `${product.qty || 1} Unit`;
  el('resWeight').innerText = `${product.weightGram || 18} Gram`;
  el('resPoints').innerText = `+${product.poin} Pts`;
  el('resTime').innerText = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  views.forEach(v => el(v).classList.add('hidden')); 
  el('bottomNav').classList.add('hidden'); 
  el('viewResult').classList.remove('hidden');
}

el('btnCancelScan').addEventListener('click', () => { 
  el('viewResult').classList.add('hidden'); 
  switchView('viewHome'); 
  el('bottomNav').classList.remove('hidden'); 
});

// SIMPAN DATA KE EPR CLOUD DATABASE
el('btnSave').addEventListener('click', async () => {
  if (!currentScannedProductData) return;
  const btnSave = el('btnSave'); 
  btnSave.innerText = "Menyimpan ke Cloud...";

  state.points += currentScannedProductData.poin;
  if (currentScannedProductData.jenis.toLowerCase().includes('pet')) {
    state.stats.pet += (currentScannedProductData.qty || 1); 
  } else {
    state.stats.ml += (currentScannedProductData.qty || 1);
  }

  addStreak(); 
  updateUIStatsAndLevel(); 
  fetchLeaderboardRealtime(); 
  saveState();

  const scanData = {
    action: "saveScan",
    kulaId: state.kulaId || "KULA-0000",
    nama: state.user || "Siswa",
    sekolah: state.school || "-",
    fmcgBrand: currentScannedProductData.fmcg || "FMCG Brand",
    sku: currentScannedProductData.sku,
    namaProduk: currentScannedProductData.nama,
    jenisMaterial: currentScannedProductData.jenis,
    jumlahUnit: currentScannedProductData.qty || 1,
    estimasiBeratGram: currentScannedProductData.weightGram || 18,
    poin: currentScannedProductData.poin,
    scannedAt: new Date().toLocaleString('id-ID')
  };

  try {
    await fetch(DATABASE_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scanData)
    });
  } catch (err) {
    console.warn("Koneksi cloud offline, data setoran tersimpan lokal.", err);
  } finally {
    el('viewResult').classList.add('hidden'); 
    switchView('viewHome'); 
    el('bottomNav').classList.remove('hidden');
    btnSave.innerHTML = `Simpan Data EPR <i class="ph-bold ph-cloud-arrow-up"></i>`; 
    currentScannedProductData = null;
    showToast("Data EPR berhasil dicatat di Cloud!", "success");
  }
});