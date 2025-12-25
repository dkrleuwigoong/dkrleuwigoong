/* -------------------- SIDEBAR -------------------- */
const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  overlay.classList.toggle("show");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("show");
});

document.querySelectorAll(".dropdown-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.parentElement.classList.toggle("active");
  });
});

/* ------------------- DATABASE LOCALSTORAGE ------------------- */
let anggota = JSON.parse(localStorage.getItem("anggota")) || [];
let anggotadkr = JSON.parse(localStorage.getItem("anggotadkr")) || [];

// fungsi simpan anggota ke localStorage
function saveAnggota() {
  localStorage.setItem("anggota", JSON.stringify(anggota));
}

function saveAnggotaDkr() {
  localStorage.setItem("anggotadkr", JSON.stringify(anggotadkr));
}

/* ------------------- RENDER TABEL ANGGOTA ------------------- */
function renderTable() {
  const tbody = document.getElementById("tableBody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const search = document.getElementById("searchInput").value.toLowerCase();

  anggota
    .filter((a) => a.nama && a.nama.toLowerCase().includes(search))
    .forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nta || ""}</td>
        <td>${item.nama || ""}</td>
        <td>${item.jk || ""}</td>
        <td>${item.tempat || ""}</td>
        <td>${item.tanggal || ""}</td>
        <td>${item.pangkalan || ""}</td>
        <td>${item.golongan || ""}</td>
        <td>${item.tku || ""}</td>
        <td>${item.alamat || ""}</td>
        <td>${item.hp || ""}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editData(${index})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteData(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

/* ------------------- RENDER TABEL ANGGOTA DKR ------------------- */
function renderTableDkr() {
  const tbody = document.getElementById("tableBodyDkr");
  if (!tbody) return;

  tbody.innerHTML = "";
  const search =
    document.getElementById("searchInput")?.value.toLowerCase() || "";

  anggotadkr
    .filter((a) => a.nama2 && a.nama2.toLowerCase().includes(search))
    .forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.nta2 || ""}</td>
        <td>${item.nama2 || ""}</td>
        <td>${item.jk2 || ""}</td>
        <td>${item.tempat2 || ""}</td>
        <td>${item.tanggal2 || ""}</td>
        <td>${item.pangkalan2 || ""}</td>
        <td>${item.golongan2 || ""}</td>
        <td>${item.tku2 || ""}</td>
        <td>${item.alamat2 || ""}</td>
        <td>${item.hp2 || ""}</td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editDataDkr(${index})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-danger btn-sm" onclick="deleteDataDkr(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}

/* ------------------- MODAL TAMBAH / EDIT ------------------- */
function openAddModal() {
  document.getElementById("dataModal").classList.add("show");
  document.getElementById("modalTitle").innerText = "Tambah Anggota";
  document.getElementById("editIndex").value = "";

  // Reset semua input
  document
    .querySelectorAll(
      "#dataModal input, #dataModal textarea, #dataModal select"
    )
    .forEach((el) => (el.value = ""));

  document.getElementById("jkInput").value = "Laki-laki";
  document.getElementById("golonganInput").value = "Penegak";
  document.getElementById("tkuInput").value = "Bantara";
}

function editData(index) {
  document.getElementById("dataModal").classList.add("show");
  document.getElementById("modalTitle").innerText = "Edit Anggota";
  document.getElementById("editIndex").value = index;

  const item = anggota[index];
  if (!item) return;

  document.getElementById("ntaInput").value = item.nta || "";
  document.getElementById("namaInput").value = item.nama || "";
  document.getElementById("jkInput").value = item.jk || "Laki-laki";
  document.getElementById("tempatInput").value = item.tempat || "";
  document.getElementById("tanggalInput").value = item.tanggal || "";
  document.getElementById("pangkalanInput").value = item.pangkalan || "";
  document.getElementById("golonganInput").value = item.golongan || "Penegak";
  document.getElementById("tkuInput").value = item.tku || "Bantara";
  document.getElementById("alamatInput").value = item.alamat || "";
  document.getElementById("hpInput").value = item.hp || "";
}

/* ------------------- SIMPAN DATA ------------------- */
function saveData() {
  const editIndex = document.getElementById("editIndex").value;
  const newData = {
    nta: document.getElementById("ntaInput").value,
    nama: document.getElementById("namaInput").value,
    jk: document.getElementById("jkInput").value,
    tempat: document.getElementById("tempatInput").value,
    tanggal: document.getElementById("tanggalInput").value,
    pangkalan: document.getElementById("pangkalanInput").value,
    golongan: document.getElementById("golonganInput").value,
    tku: document.getElementById("tkuInput").value,
    alamat: document.getElementById("alamatInput").value,
    hp: document.getElementById("hpInput").value,
  };

  if (editIndex === "") {
    anggota.push(newData);
  } else {
    anggota[editIndex] = newData;
  }

  saveAnggota();
  renderTable();
  closeModal();

  // Pemberitahuan sukses
  alert("Data berhasil disimpan!");
}

/* ------------------- HAPUS DATA ------------------- */
let deleteIndex = null;

function deleteData(index) {
  deleteIndex = index;
  document.getElementById("confirmModal").style.display = "flex";
}

document.getElementById("confirmYes").onclick = function () {
  if (deleteIndex !== null) {
    anggota.splice(deleteIndex, 1);
    saveAnggota();
    renderTable();
    deleteIndex = null;
  }
  document.getElementById("confirmModal").style.display = "none";
};

document.getElementById("confirmNo").onclick = function () {
  document.getElementById("confirmModal").style.display = "none";
};

/* ------------------- TUTUP MODAL ------------------- */
function closeModal() {
  document.getElementById("dataModal").classList.remove("show");
}

/* ------------------- VALIDASI NTA ------------------- */
function validateNTA(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
  if (input.value.length > 15) input.value = input.value.slice(0, 15);
}

/* ------------------- INIT ------------------- */
renderTable();
renderTableDkr(); // Jika ada tabel DKR

/* ============================= Data Anggota DKR ========================================== */

// ==========================
// LOCAL STORAGE
// ==========================
function loadData() {
  return JSON.parse(localStorage.getItem("anggota-dkr")) || [];
}

function saveToStorage(data) {
  localStorage.setItem("anggota-dkr", JSON.stringify(data));
}

// ==========================
// RENDER TABEL
// ==========================
function renderTable() {
  let data = loadData();
  const search = document.getElementById("searchInput").value.toLowerCase();
  const table = document.getElementById("tableBodyDkr");

  table.innerHTML = "";

  data
    .filter((item) => item.nama.toLowerCase().includes(search))
    .forEach((item, index) => {
      table.innerHTML += `
        <tr>
          <td>${index + 1}</td>
          <td>${item.nta}</td>
          <td>${item.nama}</td>
          <td>${item.jk}</td>
          <td>${item.tempat}</td>
          <td>${item.tanggal}</td>
          <td>${item.pangkalan}</td>
          <td>${item.gudep}</td>
          <td>${item.golongan}</td>
          <td>${item.tku}</td>
          <td>${item.alamat}</td>
          <td>${item.hp}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editData(${index})">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm" onclick="confirmDelete(${index})">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });
}

document.addEventListener("DOMContentLoaded", renderTable);

// ==========================
// MODAL TAMBAH / EDIT
// ==========================
function openAddModal() {
  document.getElementById("modalTitle").innerText = "Tambah Anggota";
  document.getElementById("editIndex").value = "";
  clearForm();
  document.getElementById("dataModal").style.display = "block";
}

function closeModal() {
  document.getElementById("dataModal").style.display = "none";
}

function clearForm() {
  document
    .querySelectorAll("#dataModal input, #dataModal textarea")
    .forEach((el) => (el.value = ""));
}

// ==========================
// SIMPAN DATA
// ==========================
function saveData() {
  // Ambil nilai input
  const nta = document.getElementById("ntaInput").value.trim();
  const nama = document.getElementById("namaInput").value.trim();
  const jk = document.getElementById("jkInput").value;
  const tempat = document.getElementById("tempatInput").value.trim();
  const tanggal = document.getElementById("tanggalInput").value;
  const pangkalan = document.getElementById("pangkalanInput").value.trim();
  const gudep = document.getElementById("gudepInput").value.trim();
  const golongan = document.getElementById("golonganInput").value;
  const tku = document.getElementById("tkuInput").value;
  const alamat = document.getElementById("alamatInput").value.trim();
  const hp = document.getElementById("hpInput").value.trim();

  // =============================
  // VALIDASI WAJIB DIISI
  // =============================
  if (
    nama === "" ||
    tempat === "" ||
    tanggal === "" ||
    pangkalan === "" ||
    golongan === "" ||
    tku === "" ||
    alamat === "" ||
    hp === ""
  ) {
    alert("Harap isi semua field yang wajib diisi!");
    return;
  }

  // Validasi HP harus angka
  if (!/^[0-9]+$/.test(hp)) {
    alert("Nomor HP hanya boleh angka!");
    return;
  }

  // Jika ada NTA → cek hanya angka
  if (nta !== "" && !/^[0-9]+$/.test(nta)) {
    alert("NTA hanya boleh berisi angka!");
    return;
  }

  // =============================
  // Simpan ke localStorage
  // =============================
  let data = loadData();
  let index = document.getElementById("editIndex").value;

  const newData = {
    nta,
    nama,
    jk,
    tempat,
    tanggal,
    pangkalan,
    gudep,
    golongan,
    tku,
    alamat,
    hp,
  };

  if (index === "") {
    data.push(newData);
  } else {
    data[index] = newData;
  }

  saveToStorage(data);
  renderTable();
  closeModal();
}

// ==========================
// EDIT DATA
// ==========================
function editData(index) {
  let data = loadData()[index];

  document.getElementById("modalTitle").innerText = "Edit Data Anggota";
  document.getElementById("editIndex").value = index;

  document.getElementById("ntaInput").value = data.nta;
  document.getElementById("namaInput").value = data.nama;
  document.getElementById("jkInput").value = data.jk;
  document.getElementById("tempatInput").value = data.tempat;
  document.getElementById("tanggalInput").value = data.tanggal;
  document.getElementById("pangkalanInput").value = data.pangkalan;
  document.getElementById("gudepInput").value = data.gudep;
  document.getElementById("golonganInput").value = data.golongan;
  document.getElementById("tkuInput").value = data.tku;
  document.getElementById("alamatInput").value = data.alamat;
  document.getElementById("hpInput").value = data.hp;

  document.getElementById("dataModal").style.display = "block";
}

// ==========================
// DELETE KONFIRMASI
// ==========================
function confirmDelete(index) {
  const modal = document.getElementById("confirmModal");
  modal.style.display = "block";

  document.getElementById("confirmYes").onclick = function () {
    deleteData(index);
    modal.style.display = "none";
  };

  document.getElementById("confirmNo").onclick = function () {
    modal.style.display = "none";
  };
}

function deleteData(index) {
  let data = loadData();
  data.splice(index, 1);
  saveToStorage(data);
  renderTable();
}

// ==========================
// VALIDASI INPUT NTA
// ==========================
function validateNTA(input) {
  input.value = input.value.replace(/[^0-9]/g, "");
}

function presensiMasuk() {
  let tgl = document.getElementById("tanggal").value;
  if (!tgl) return alert("Pilih tanggal terlebih dahulu!");

  let waktu = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let status =
    waktu <= "08:00"
      ? '<span class="badge bg-success">Hadir</span>'
      : '<span class="badge bg-warning">Terlambat</span>';

  let row = `
    <tr>
      <td>${tgl}</td>
      <td>${waktu}</td>
      <td>-</td>
      <td>${status}</td>
    </tr>
  `;
  document.getElementById("tabelPresensi").innerHTML += row;
}

function presensiPulang() {
  let tgl = document.getElementById("tanggal").value;
  if (!tgl) return alert("Pilih tanggal terlebih dahulu!");

  let waktu = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  let tabel = document.getElementById("tabelPresensi").rows;
  for (let i = tabel.length - 1; i >= 0; i--) {
    if (
      tabel[i].cells[0].innerText === tgl &&
      tabel[i].cells[2].innerText === "-"
    ) {
      tabel[i].cells[2].innerText = waktu;

      // Update status pulang awal
      if (waktu < "15:00") {
        tabel[i].cells[3].innerHTML =
          '<span class="badge bg-danger">Pulang Awal</span>';
      }

      break;
    }
  }
}
function presensiMasuk() {
  let modal = new bootstrap.Modal(document.getElementById("dataPresensi"));
  modal.show();
}

function isiTanggalPresensi() {
  const elemen = document.getElementById("tanggalPresensi");

  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const now = new Date();
  const tgl = `${hari[now.getDay()]}, ${now.getDate()} ${
    bulan[now.getMonth()]
  } ${now.getFullYear()}`;

  elemen.textContent = tgl;
}

function loadTablePresensi() {
  let data = JSON.parse(localStorage.getItem("anggota-dkr")) || [];
  let tbody = document.getElementById("presensiTableBody");

  tbody.innerHTML = "";

  data.forEach((item, index) => {
    let row = `
      <tr>
        <td>${index + 1}</td>
        <td>${item.nta}</td>
        <td>${item.nama}</td>
        <td>
          <select class="form-select presensi-select" data-index="${index}">
            <option value="Hadir">Hadir</option>
            <option value="Sakit">Sakit</option>
            <option value="Izin">Izin</option>
            <option value="Alfa" selected>Alfa</option>
          </select>
        </td>
      </tr>
    `;

    tbody.innerHTML += row;
  });
}

function presensiMasuk() {
  isiTanggalPresensi(); // isi tanggal otomatis
  loadTablePresensi(); // tampilkan data anggota

  let modal = new bootstrap.Modal(document.getElementById("dataPresensi"));
  modal.show();
}

function loadRekapPresensi() {
  const dataPresensi =
    JSON.parse(localStorage.getItem("presensiTableBody")) || [];
  const tbody = document.getElementById("presensiTableBody");

  tbody.innerHTML = "";

  dataPresensi.forEach((item, index) => {
    // Hitung hadir & tidak hadir
    let hadir = item.presensi.filter((p) => p.status === "Hadir").length;

    let tidakHadir = item.presensi.filter(
      (p) => p.status === "Izin" || p.status === "Sakit" || p.status === "Alfa"
    ).length;

    // Tentukan keterangan
    let ket =
      tidakHadir > 0 ? `${tidakHadir} anggota tidak hadir` : "Semua hadir";

    // Masukkan ke tabel
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${item.tanggal}</td>
        <td>${hadir}</td>
        <td>${tidakHadir}</td>
        <td>${ket}</td>
      </tr>
    `;

    tbody.innerHTML += row;
  });
}

// Jalankan otomatis
loadRekapPresensi();
