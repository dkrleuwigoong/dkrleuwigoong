document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle");
  const sidebar = document.querySelector(".sidebar");
  const mainWrapper = document.querySelector(".main-wrapper");

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    if (window.innerWidth <= 768) {
      // MODE HP (overlay)
      sidebar.classList.toggle("active");
    } else {
      // MODE DESKTOP (geser)
      sidebar.classList.toggle("active");
      mainWrapper.classList.toggle("shift");
    }
  });

  // Klik di luar sidebar (HP)
  document.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
    }
  });

  sidebar.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

function openModal(edit = false) {
  document.getElementById("modalAnggota").style.display = "flex";
  document.getElementById("modalTitle").innerText = edit
    ? "Edit Anggota"
    : "Tambah Anggota";
}

function closeModal() {
  document.getElementById("modalAnggota").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  const golongan = document.getElementById("golongan");
  const tku = document.getElementById("tku");

  golongan.addEventListener("change", function () {
    tku.innerHTML = '<option value="">Pilih TKU</option>';

    if (this.value === "penegak") {
      tku.innerHTML += `
        <option value="bantara">Bantara</option>
        <option value="laksana">Laksana</option>
      `;
    }

    if (this.value === "pandega") {
      tku.innerHTML += `
        <option value="pandega">Pandega</option>
      `;
    }
  });
});

document.getElementById("nta").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "").slice(0, 15);
});

let arsipAnggota = JSON.parse(localStorage.getItem("arsipAnggota")) || [];
let indexEdit = null;

/* =====================
   BATASI INPUT NTA
===================== */
document.getElementById("nta").addEventListener("input", function () {
  this.value = this.value.replace(/[^0-9]/g, "").slice(0, 15);
});

/* =====================
   SIMPAN DATA
===================== */
document.getElementById("formAnggota").addEventListener("submit", function (e) {
  e.preventDefault();

  const anggota = {
    nta: nta.value,
    nama: nama.value,
    jk: jk.value,
    tempatLahir: tempatLahir.value,
    tanggalLahir: tanggalLahir.value,
    gudep: gudep.value,
    golongan: golongan.value,
    tku: tku.value,
    tkk: tkk.value,
    nohp: nohp.value,
    alamat: alamat.value,
    foto: "",
  };

  const fotoInput = foto.files[0];

  if (fotoInput) {
    const reader = new FileReader();
    reader.onload = () => {
      anggota.foto = reader.result;
      simpanEditTambah(anggota);
    };
    reader.readAsDataURL(fotoInput);
  } else {
    anggota.foto = indexEdit !== null ? arsipAnggota[indexEdit].foto : "";
    simpanEditTambah(anggota);
  }
});

/* =====================
   SIMPAN KE LOCALSTORAGE
===================== */
function simpanData() {
  localStorage.setItem("arsipAnggota", JSON.stringify(arsipAnggota));
  tampilkanTabel();
  closeModal();
  document.getElementById("formAnggota").reset();
}

/* =====================
   TAMPILKAN KE TABEL
===================== */
function tampilkanTabel() {
  const tbody = document.querySelector("#tabelAnggota tbody");
  tbody.innerHTML = "";

  arsipAnggota.forEach((a, i) => {
    tbody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${a.nta}</td>
        <td>${a.nama}</td>
        <td>${a.jk}</td>
        <td>${a.tempatLahir}</td>
        <td>${a.tanggalLahir}</td>
        <td>${a.gudep}</td>
        <td>${a.golongan}</td>
        <td>${a.tku}</td>
        <td>${a.tkk}</td>
        <td>${a.nohp}</td>
        <td>${a.alamat}</td>
        <td>
          ${
            a.foto
              ? `<img src="${a.foto}" style="width:40px;height:40px;border-radius:6px;object-fit:cover">`
              : "-"
          }
        </td>
        <td>
          <button class="btn-edit" onclick="editAnggota(${i})">Edit</button>
          <button class="btn-delete" onclick="hapusAnggota(${i})">Hapus</button>
        </td>
      </tr>
    `;
  });
}

/* =====================
   LOAD SAAT HALAMAN DIBUKA
===================== */
document.addEventListener("DOMContentLoaded", tampilkanTabel);

function editAnggota(index) {
  const a = arsipAnggota[index];
  indexEdit = index;

  nta.value = a.nta;
  nama.value = a.nama;
  jk.value = a.jk;
  tempatLahir.value = a.tempatLahir;
  tanggalLahir.value = a.tanggalLahir;
  gudep.value = a.gudep;
  golongan.value = a.golongan;

  // trigger TKU sesuai golongan
  golongan.dispatchEvent(new Event("change"));
  tku.value = a.tku;

  tkk.value = a.tkk;
  nohp.value = a.nohp;
  alamat.value = a.alamat;

  document.getElementById("modalTitle").innerText = "Edit Anggota";
  document.getElementById("modalAnggota").style.display = "flex";
}

function simpanEditTambah(data) {
  if (indexEdit !== null) {
    arsipAnggota[indexEdit] = data;
    indexEdit = null;
  } else {
    arsipAnggota.push(data);
  }

  localStorage.setItem("arsipAnggota", JSON.stringify(arsipAnggota));
  tampilkanTabel();
  closeModal();
  formAnggota.reset();
}

let indexHapusAnggota = null;

/* BUKA MODAL HAPUS */
function hapusAnggota(index) {
  indexHapusAnggota = index;

  // tampilkan nama anggota di modal
  document.getElementById("namaHapus").innerText =
    arsipAnggota[index].nama || "-";

  document.getElementById("modalHapus").classList.add("show");
}

/* TUTUP MODAL */
function closeModalHapus() {
  document.getElementById("modalHapus").classList.remove("show");
  indexHapusAnggota = null;
}

/* KONFIRMASI HAPUS */
document
  .getElementById("btnHapusConfirm")
  .addEventListener("click", function () {
    if (indexHapusAnggota !== null) {
      arsipAnggota.splice(indexHapusAnggota, 1);
      localStorage.setItem("arsipAnggota", JSON.stringify(arsipAnggota));
      tampilkanTabel();
      closeModalHapus();
    }
  });

document.addEventListener("DOMContentLoaded", function () {
  // Dummy data users (jika localStorage kosong, isi default)
  if (!localStorage.getItem("users")) {
    const defaultUsers = [
      {
        nama: "Agum Riyadi",
        noHP: "081234567890",
        jabatan: "Admin",
        gugusDepan: "Gugus A",
        username: "agumriyadi",
        password: "123456",
      },
      {
        nama: "Siti Aminah",
        noHP: "081298765432",
        jabatan: "User",
        gugusDepan: "Gugus B",
        username: "sitiaminah",
        password: "abcdef",
      },
    ];
    localStorage.setItem("users", JSON.stringify(defaultUsers));
  }

  // Ambil data dari localStorage
  const tbody = document.querySelector("#tabelAkun tbody");
  const storedUsers = localStorage.getItem("users");

  if (storedUsers) {
    const users = JSON.parse(storedUsers);
    tbody.innerHTML = "";

    users.forEach((user, index) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.nama}</td>
        <td>${user.noHP}</td>
        <td>${user.jabatan}</td>
        <td>${user.gugusDepan}</td>
        <td>${user.username}</td>
        <td>${user.password}</td>
        <td>
          <button class="btn-edit" onclick="editUser(${index})">Edit</button>
          <button class="btn-delete" onclick="deleteUser(${index})">Hapus</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } else {
    tbody.innerHTML = `<tr><td colspan="8" class="text-center">Tidak ada data</td></tr>`;
  }
});

// Fungsi Edit (sementara hanya alert)
function editUser(index) {
  alert("Edit user index: " + index);
}

// Fungsi Hapus
function deleteUser(index) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (confirm(`Hapus user ${users[index].nama}?`)) {
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    location.reload(); // Reload halaman supaya tabel terupdate
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const data = localStorage.getItem("akunData");
  let total = 0;

  if (data) {
    total = JSON.parse(data).length;
  }

  document.getElementById("totalAnggota").textContent = total;
});

const jadwalData = JSON.parse(localStorage.getItem("jadwalKegiatan")) || [];

const jadwalList = document.getElementById("jadwalList");

if (jadwalData.length === 0) {
  jadwalList.innerHTML =
    "<li><span class='kegiatan'>Belum ada jadwal kegiatan</span></li>";
} else {
  jadwalList.innerHTML = "";
  jadwalData.slice(0, 3).forEach((jadwal) => {
    jadwalList.innerHTML += `
        <li>
          <span class="tanggal">${jadwal.tanggal}</span>
          <span class="kegiatan">${jadwal.nama}</span>
        </li>
      `;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggle");
  const sidebar = document.querySelector(".sidebar");
  const mainWrapper = document.querySelector(".main-wrapper");

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    if (window.innerWidth <= 768) {
      // MODE HP (overlay)
      sidebar.classList.toggle("active");
    } else {
      // MODE DESKTOP (geser)
      sidebar.classList.toggle("active");
      mainWrapper.classList.toggle("shift");
    }
  });

  // Klik di luar sidebar (HP)
  document.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active");
    }
  });

  sidebar.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

document.getElementById("totalPenegak").textContent = 120;
document.getElementById("penegakPutra").textContent = 70;
document.getElementById("penegakPutri").textContent = 50;

document.getElementById("totalPandega").textContent = 80;
document.getElementById("pandegaPutra").textContent = 45;
document.getElementById("pandegaPutri").textContent = 35;

document.getElementById("totalKegiatan").textContent = 32;
document.getElementById("kegiatanRutin").textContent = 18;
document.getElementById("kegiatanKhusus").textContent = 10;
document.getElementById("kegiatanBesar").textContent = 4;

document.addEventListener("DOMContentLoaded", function () {
  const anggotaForm = document.getElementById("anggotaForm");
  const confirmModalEl = document.getElementById("confirmModal");
  const confirmModal = new bootstrap.Modal(confirmModalEl);
  const formModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("formAnggotaModal")
  );

  anggotaForm.addEventListener("submit", function (e) {
    e.preventDefault(); // hentikan submit langsung
    confirmModal.show(); // tampilkan modal konfirmasi
  });

  document.getElementById("confirmSave").addEventListener("click", function () {
    // Ambil data form
    const data = JSON.parse(localStorage.getItem("arsipAnggota")) || [];
    data.push({
      nta: document.getElementById("nta").value.trim(),
      nama: document.getElementById("nama").value.trim(),
      jk: document.getElementById("jk").value,
      tempatLahir: document.getElementById("tempatLahir").value.trim(),
      tanggalLahir: document.getElementById("tanggalLahir").value,
      jabatan: document.getElementById("jabatan").value.trim(),
      status: document.getElementById("status").value,
      noHP: document.getElementById("noHp").value.trim(),
    });
    localStorage.setItem("arsipAnggota", JSON.stringify(data));

    // Reset form
    anggotaForm.reset();

    // Tutup kedua modal
    confirmModal.hide();
    formModal.hide();

    // Redirect jika perlu
    // window.location.href = "data-anggota.html";

    console.log("Data anggota tersimpan:", data);
  });
});
