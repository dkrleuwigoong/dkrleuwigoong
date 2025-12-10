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
let anggota = JSON.parse(localStorage.getItem("anggota")) || [
  { },
  { },
];

function saveToLocal() {
  localStorage.setItem("anggota", JSON.stringify(anggota));
}

/* ------------------- RENDER TABEL ------------------- */

function renderTable() {
  const tbody = document.getElementById("tableBody");
  const search = document.getElementById("searchInput").value.toLowerCase();
  const filter = document.getElementById("filterStatus").value;

  tbody.innerHTML = "";

  anggota
    .filter(
      (item) =>
        (filter === "all" || item.golongan === filter) &&
        item.nama.toLowerCase().includes(search)
    )
    .forEach((item, index) => {
      const row = `
          <tr>
            <td>${index + 1}</td>
            <td>${item.nta}</td>
            <td>${item.nama}</td>
            <td>${item.jk}</td>
            <td>${item.tempat}</td>
            <td>${item.tanggal}</td>
            <td>${item.pangkalan}</td>
            <td>${item.golongan}</td>
            <td>${item.tku}</td>
            <td>${item.alamat}</td>
            <td>${item.hp}</td>
            <td>
              <button class="btn btn-warning btn-sm" onclick="editData(${index})">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-danger btn-sm" onclick="deleteData(${index})">
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        `;
      tbody.innerHTML += row;
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
  const index = document.getElementById("editIndex").value;

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

  if (index === "") {
    anggota.push(newData); // tambah baru
  } else {
    anggota[index] = newData; // perbarui data
  }

  saveToLocal();
  renderTable();
  closeModal();
}

/* ------------------- HAPUS DATA ------------------- */

function deleteData(index) {
  if (confirm("Hapus data ini?")) {
    anggota.splice(index, 1);
    saveToLocal();
    renderTable();
  }
}

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
