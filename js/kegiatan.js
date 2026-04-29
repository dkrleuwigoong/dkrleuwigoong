// Ambil elemen form & modal
const form = document.getElementById("formKegiatan");
const modal = document.getElementById("modalBukti");
const closeModal = document.getElementById("closeModal");
const buktiInfo = document.getElementById("buktiInfo");
const qrDiv = document.getElementById("qrcode");

// Ambil data dari LocalStorage atau buat array baru
let daftarPeserta = JSON.parse(localStorage.getItem("daftarPeserta")) || [];

// Nama & tempat lahir uppercase otomatis
document.getElementById("nama").addEventListener("input", (e) => {
  e.target.value = e.target.value.toUpperCase();
});
document.getElementById("asal").addEventListener("input", (e) => {
  e.target.value = e.target.value.toUpperCase();
});
document.getElementById("tempatLahir").addEventListener("input", (e) => {
  e.target.value = e.target.value.toUpperCase();
});

// Submit form
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Ambil nilai input
  const pesertaBaru = {
    id: Date.now(),
    nama: document.getElementById("nama").value,
    jk: document.getElementById("jk").value,
    tempatLahir: document.getElementById("tempatLahir").value,
    tanggalLahir: document.getElementById("tanggalLahir").value,
    asal: document.getElementById("asal").value,
    kegiatan: document.getElementById("kegiatan").value,
    tanggal: document.getElementById("tanggal").value,
    nohp: document.getElementById("nohp").value,
    kategori: document.getElementById("kategori").value,
    waktuDaftar: new Date().toLocaleString("id-ID"),
  };

  // Simpan ke array
  daftarPeserta.push(pesertaBaru);

  // Simpan ke LocalStorage
  localStorage.setItem("daftarPeserta", JSON.stringify(daftarPeserta));

  // Tampilkan modal bukti pendaftaran
  showBukti(pesertaBaru);

  // Reset form
  form.reset();
});

// Fungsi tampilkan modal bukti pendaftaran
function showBukti(peserta) {
  buktiInfo.innerHTML = `
    <p><strong>Nama:</strong> ${peserta.nama}</p>
    <p><strong>Jenis Kelamin:</strong> ${peserta.jk}</p>
    <p><strong>Tempat, Tanggal Lahir:</strong> ${peserta.tempatLahir}, ${peserta.tanggalLahir}</p>
    <p><strong>Asal Gugus / Ambalan:</strong> ${peserta.asal}</p>
    <p><strong>Kegiatan:</strong> ${peserta.kegiatan}</p>
    <p><strong>Tanggal Kegiatan:</strong> ${peserta.tanggal}</p>
    <p><strong>No HP:</strong> ${peserta.nohp}</p>
    <p><strong>Kategori:</strong> ${peserta.kategori}</p>
    <p><strong>Waktu Daftar:</strong> ${peserta.waktuDaftar}</p>
  `;

  // Hapus QR sebelumnya
  qrDiv.innerHTML = "";

  // Generate QR Code
  new QRCode(qrDiv, {
    text: JSON.stringify(peserta),
    width: 200,
    height: 200,
  });

  // Tampilkan modal
  modal.style.display = "block";
}

// Tutup modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// Tutup modal saat klik di luar content
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});
