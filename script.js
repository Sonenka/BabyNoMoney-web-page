import { songs } from "./slides.js";
import { videos } from "./slides.js";

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slidesToShow = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--music-columns').trim(), 10);
    const sliderWrapper = document.getElementById("music__wrapper");
    const prevButtons = document.querySelectorAll(".music__controll_prev");
    const nextButtons = document.querySelectorAll(".music__controll_next");

    if (!sliderWrapper || !prevButtons.length || !nextButtons.length || !songs.length) {
        console.error("Slider elements or slides data not found!");
        return;
    }

    function updateSlides() {
        sliderWrapper.innerHTML = "";
        for (let i = 0; i < slidesToShow; i++) {
            const slideIndex = (index + i) % songs.length;
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("music__item");
            slideDiv.innerHTML = `
                <div class="music__song">
                    <div class="music__song-wrapper">  
                        <img src="${songs[slideIndex].image}" alt="Slide" class="music__image">
                        <button class="music__button-img"></button>
                    </div>
                  <p class="music__title">${songs[slideIndex].text}</p>
                </div>
            `;

            slideDiv.querySelector(".music__song").addEventListener("click", function () {
                slideDiv.innerHTML = `
                    <iframe 
                        class="music__iframe" 
                        width="100%" 
                        height="400" 
                        src="${songs[slideIndex].link}" 
                        frameborder="0" 
                        allow="autoplay" 
                        loading="lazy">
                    </iframe>
                    <p class="music__title">${songs[slideIndex].text}</p>
                `;
            });

            sliderWrapper.appendChild(slideDiv);
        }
    }

    function prevSlide() {
        index = (index - slidesToShow + songs.length) % songs.length;
        updateSlides();
    }

    function nextSlide() {
        index = (index + slidesToShow) % songs.length;
        updateSlides();
    }

    prevButtons.forEach(button => {
        button.addEventListener("click", prevSlide);
    });

    nextButtons.forEach(button => {
        button.addEventListener("click", nextSlide);
    });

    function addSwipeSupport() {
        let startX = 0, startY = 0, endX = 0, endY = 0;

        sliderWrapper.addEventListener("touchstart", (e) => {
            if (window.innerWidth < 768) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }
        });

        sliderWrapper.addEventListener("touchmove", (e) => {
            if (window.innerWidth < 768) {
                endX = e.touches[0].clientX;
                endY = e.touches[0].clientY;
            }
        });

        sliderWrapper.addEventListener("touchend", () => {
            if (window.innerWidth < 768) {
                let diffX = startX - endX;
                let diffY = startY - endY;

                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    diffX > 0 ? nextSlide() : prevSlide();
                }
            }
        });
    }

    addSwipeSupport();
    updateSlides();
});

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slidesToShow = 1;
    const sliderWrapper = document.getElementById("video__wrapper");
    const prevButtons = document.querySelectorAll(".video__controll_prev");
    const nextButtons = document.querySelectorAll(".video__controll_next");

    function updateSlides() {
        sliderWrapper.innerHTML = "";
        for (let i = 0; i < slidesToShow; i++) {
            const slideIndex = (index + i) % videos.length;
            
            sliderWrapper.style.backgroundImage = `url('${videos[slideIndex].image}')`;
            sliderWrapper.style.backgroundSize = "cover";
            sliderWrapper.style.backgroundPosition = "center";
            sliderWrapper.style.position = "relative";
            sliderWrapper.style.cursor = "pointer";
    
            sliderWrapper.innerHTML = `
                <button class="video__button"></button>
                <p class="video__title">${videos[slideIndex].title}</p>
            `;
    
            sliderWrapper.addEventListener("click", function () {
                sliderWrapper.innerHTML = `
                    <iframe class="video__iframe" 
                        src="${videos[slideIndex].video}?autoplay=true" 
                        frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                    </iframe>
                `;
            });
    
        }
    }

    function prevSlide() {
        index = (index - slidesToShow + videos.length) % videos.length;
        updateSlides();
    }

    function nextSlide() {
        index = (index + slidesToShow) % videos.length;
        updateSlides();
    }

    prevButtons.forEach(button => {
        button.addEventListener("click", prevSlide);
    });

    nextButtons.forEach(button => {
        button.addEventListener("click", nextSlide);
    });

    function addSwipeSupport() {
        let startX = 0, startY = 0, endX = 0, endY = 0;

        sliderWrapper.addEventListener("touchstart", (e) => {
            if (window.innerWidth < 768) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }
        });

        sliderWrapper.addEventListener("touchmove", (e) => {
            if (window.innerWidth < 768) {
                endX = e.touches[0].clientX;
                endY = e.touches[0].clientY;
            }
        });

        sliderWrapper.addEventListener("touchend", () => {
            if (window.innerWidth < 768) {
                let diffX = startX - endX;
                let diffY = startY - endY;

                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    diffX > 0 ? nextSlide() : prevSlide();
                }
            }
        });
    }

    addSwipeSupport();
    updateSlides();
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.menu__toggle');
    const menu = document.querySelector('.menu__ul');

    toggleButton.addEventListener('click', function () {
        menu.classList.toggle('menu__ul--open');
    });
});

document.getElementById('bio__button').addEventListener('click', () => {
    window.open("https://en.wikipedia.org/wiki/Bbno$", "_blank");
});

document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu__toggle");

    menuToggle.addEventListener("click", function () {
        this.classList.toggle("active");
    });
});