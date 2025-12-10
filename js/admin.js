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

// Data default jika localStorage kosong
let anggota = JSON.parse(localStorage.getItem("anggota")) || [{}, {}];

function saveToLocal() {
  localStorage.setItem("anggota", JSON.stringify(anggota));
}

/* ------------------- RENDER TABEL ------------------- */
function renderTable() {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const data = JSON.parse(localStorage.getItem("anggota")) || [];

  data
    .filter((a) => a.nama.toLowerCase().includes(search))
    .forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td data-label="No">${index + 1}</td>
        <td data-label="NTA">${item.nta}</td>
        <td data-label="Nama Lengkap">${item.nama}</td>
        <td data-label="Jenis Kelamin">${item.jk}</td>
        <td data-label="Tempat Lahir">${item.tempat}</td>
        <td data-label="Tanggal Lahir">${item.tanggal}</td>
        <td data-label="Pangkalan">${item.pangkalan}</td>
        <td data-label="Golongan">${item.golongan}</td>
        <td data-label="TKU">${item.tku}</td>
        <td data-label="Alamat">${item.alamat}</td>
        <td data-label="No HP">${item.hp}</td>

        <td data-label="Aksi">
          <button class="btn btn-sm btn-warning" onclick="editData(${index})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteData(${index})">
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
  document.getElementById("ntaInput").value = "";
  document.getElementById("namaInput").value = "";
  document.getElementById("jkInput").value = "Laki-laki";
  document.getElementById("tempatInput").value = "";
  document.getElementById("tanggalInput").value = "";
  document.getElementById("pangkalanInput").value = "";
  document.getElementById("golonganInput").value = "Penegak";
  document.getElementById("tkuInput").value = "Bantara";
  document.getElementById("alamatInput").value = "";
  document.getElementById("hpInput").value = "";
}

function editData(index) {
  document.getElementById("dataModal").classList.add("show");
  document.getElementById("modalTitle").innerText = "Edit Anggota";

  document.getElementById("editIndex").value = index;

  const item = anggota[index];

  // Isi input dengan data yang akan diedit
  document.getElementById("ntaInput").value = item.nta;
  document.getElementById("namaInput").value = item.nama;
  document.getElementById("jkInput").value = item.jk;
  document.getElementById("tempatInput").value = item.tempat;
  document.getElementById("tanggalInput").value = item.tanggal;
  document.getElementById("pangkalanInput").value = item.pangkalan;
  document.getElementById("golonganInput").value = item.golongan;
  document.getElementById("tkuInput").value = item.tku;
  document.getElementById("alamatInput").value = item.alamat;
  document.getElementById("hpInput").value = item.hp;
}

/* ------------------- SIMPAN DATA ------------------- */

function saveData() {
  const data = JSON.parse(localStorage.getItem("anggota")) || [];

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

  const editIndex = document.getElementById("editIndex").value;

  if (editIndex === "") {
    data.push(newData);
  } else {
    data[editIndex] = newData;
  }

  localStorage.setItem("anggota", JSON.stringify(data));
  renderTable();
  closeModal();
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
    saveToLocal();
    renderTable();
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

/* ------------------- RENDER SAAT PERTAMA ------------------- */
renderTable();

function validateNTA(input) {
  // Hanya angka
  input.value = input.value.replace(/[^0-9]/g, "");

  // Pastikan maksimal 15 digit
  if (input.value.length > 15) {
    input.value = input.value.slice(0, 15);
  }
}

/* ============================================================================================ */

/* ------------------- DATABASE LOCALSTORAGE ------------------- */
let anggotadkr = JSON.parse(localStorage.getItem("anggotadkr")) || [{}, {}];

function saveToLocal() {
  localStorage.setItem("anggotadkr", JSON.stringify(anggota));
}
/* ------------------- RENDER TABEL ------------------- */
function renderTable() {
  const tbody = document.getElementById("tableBodyDkr");
  tbody.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const data = JSON.parse(localStorage.getItem("anggotadkr")) || [];

  data
    .filter((a) => a.nama.toLowerCase().includes(search))
    .forEach((item, index) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td data-label="No">${index + 1}</td>
        <td data-label="NTA">${item.nta2}</td>
        <td data-label="Nama Lengkap">${item.nama2}</td>
        <td data-label="Jenis Kelamin">${item.jk2}</td>
        <td data-label="Tempat Lahir">${item.tempat2}</td>
        <td data-label="Tanggal Lahir">${item.tanggal2}</td>
        <td data-label="Pangkalan">${item.pangkalan2}</td>
        <td data-label="Golongan">${item.golongan2}</td>
        <td data-label="TKU">${item.tku2}</td>
        <td data-label="Alamat">${item.alamat2}</td>
        <td data-label="No HP">${item.hp2}</td>

        <td data-label="Aksi">
          <button class="btn btn-sm btn-warning" onclick="editData(${index})">
            <i class="bi bi-pencil"></i>
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteData(${index})">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });
}
