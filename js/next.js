// js/next.js
document.addEventListener("DOMContentLoaded", () => {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const line3 = document.getElementById("line3");
  const buttons = document.getElementById("buttons");

  setTimeout(() => {
    line1.classList.add("visible");
  }, 0);

  setTimeout(() => {
    line2.classList.add("visible");
  }, 2000);

  setTimeout(() => {
    line3.classList.add("visible");
  }, 4000);

  setTimeout(() => {
    buttons.style.display = "block";
  }, 6000);
});
