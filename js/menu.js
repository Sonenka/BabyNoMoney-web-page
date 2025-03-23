// menu.js
const toggleButton = document.querySelector('.menu__toggle');
const menu = document.querySelector('.menu__ul');

if (toggleButton && menu) {
    toggleButton.addEventListener('click', function () {
        menu.classList.toggle('menu__ul--open');
    });
}

const bioButton = document.querySelector(".bio__button");
if (bioButton) {
    bioButton.addEventListener('click', () => {
        window.open("https://en.wikipedia.org/wiki/Bbno$", "_blank");
    });
}

const menuToggle = document.querySelector(".menu__toggle");
if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
    });
}