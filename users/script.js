const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
  sidebar.classList.toggle("show");
  content.classList.toggle("full");
});
