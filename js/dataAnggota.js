// Key localStorage
const STORAGE_ANGGOTA = "dataAnggota";

// Default anggota
const defaultAnggota = [
  { id: 1, nama: "Agum Riyadi" },
  { id: 2, nama: "Ahmad Fauzi" },
  { id: 3, nama: "Dedi Pratama" },
  { id: 4, nama: "Rizky Maulana" },
];

// Inisialisasi localStorage jika belum ada
if (!localStorage.getItem(STORAGE_ANGGOTA)) {
  localStorage.setItem(STORAGE_ANGGOTA, JSON.stringify(defaultAnggota));
}

// Ambil data anggota dari localStorage
const dataAnggota = JSON.parse(localStorage.getItem(STORAGE_ANGGOTA)) || [];

// Ambil nama anggota saja
const namaAnggota = dataAnggota.map((anggota) => anggota.nama);

// Fungsi untuk menambahkan anggota baru
function tambahAnggota(namaBaru) {
  if (!namaBaru) return;

  // Cari id terakhir
  const lastId =
    dataAnggota.length > 0 ? dataAnggota[dataAnggota.length - 1].id : 0;
  const anggotaBaru = { id: lastId + 1, nama: namaBaru };

  dataAnggota.push(anggotaBaru);
  localStorage.setItem(STORAGE_ANGGOTA, JSON.stringify(dataAnggota));

  console.log(`Anggota "${namaBaru}" berhasil ditambahkan.`);
}

// Fungsi untuk menghapus anggota berdasarkan id
function hapusAnggota(id) {
  const index = dataAnggota.findIndex((a) => a.id === id);
  if (index === -1) return;

  const nama = dataAnggota[index].nama;
  dataAnggota.splice(index, 1);
  localStorage.setItem(STORAGE_ANGGOTA, JSON.stringify(dataAnggota));

  console.log(`Anggota "${nama}" berhasil dihapus.`);
}

// Export (opsional jika pakai module)
// export { dataAnggota, namaAnggota, tambahAnggota, hapusAnggota };
