// Toggle menu
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// Klik di luar navbar untuk close
document.addEventListener("click", function (e) {
  if (
    !navbarNav.contains(e.target) &&
    !document.querySelector("#menu").contains(e.target)
  ) {
    navbarNav.classList.remove("active");
  }
});

// Scroll section active link
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll(".navbar-nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector('.navbar-nav a[href="#' + id + '"]')
          .classList.add("active");
      });
    }
  });
};

const searchBtn = document.getElementById("search-btn");
const searchBox = document.getElementById("search-box");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchBox.style.display =
    searchBox.style.display === "block" ? "none" : "block";
});

// Klik di luar search box untuk menutup
document.addEventListener("click", function (e) {
  if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
    searchBox.style.display = "none";
  }
});

// Buka modal
document.querySelectorAll(".selengkapnya").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const modalId = this.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "block";
  });
});

// Tutup modal dengan tombol close
document.querySelectorAll(".close").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.parentElement.parentElement.style.display = "none";
  });
});

// Tutup modal jika klik area luar
window.addEventListener("click", function (e) {
  document.querySelectorAll(".modal").forEach((modal) => {
    if (e.target === modal) modal.style.display = "none";
  });
});
