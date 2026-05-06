// Toggle Sidebar
const toggleBtn = document.querySelector('.btn-toggle');
const sidebar = document.querySelector('.sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

// Tanggal Otomatis

function updateTanggal() {
  const hari = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  const sekarang = new Date();

  const namaHari = hari[sekarang.getDay()];
  const tanggal = sekarang.getDate();
  const namaBulan = bulan[sekarang.getMonth()];
  const tahun = sekarang.getFullYear();

  const hasil = `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;

  document.getElementById("tanggal").innerText = hasil;
}

updateTanggal();

// Grafik Keuangan
const ctx = document.getElementById('myChart');

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
    datasets: [{
      label: 'Jumlah Anggota',
      data: [120, 190, 300, 250, 220, 310],
      borderWidth: 1,
      borderRadius: 8
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});