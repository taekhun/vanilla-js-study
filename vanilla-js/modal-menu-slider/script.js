const body = document.querySelector("body");
const modalContainer = document.querySelector(".modal-container");
const toggleBtn = document.querySelector(".toggle");
const signup = document.querySelector(".cta-btn");
const closeBtn = document.querySelector(".close-btn");

toggle.addEventListener("click", () => body.classList.toggle("show-nav"));
signup.addEventListener("click", () => modalContainer.classList.toggle("show-modal"));
closeBtn.addEventListener("click", () => modalContainer.classList.toggle("show-modal"));
