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
    
            // Создаем контейнер music__song-wrapper один раз
            const songWrapper = document.createElement("div");
            songWrapper.classList.add("music__song-wrapper");
    
            // Добавляем картинку и кнопку внутри songWrapper
            const img = document.createElement("img");
            img.src = songs[slideIndex].image;
            img.alt = "Slide";
            img.classList.add("music__image");
    
            const button = document.createElement("button");
            button.classList.add("music__button-img");
    
            songWrapper.appendChild(img);
            songWrapper.appendChild(button);
    
            slideDiv.appendChild(songWrapper);
    
            // Добавляем заголовок
            const title = document.createElement("p");
            title.classList.add("music__title");
            title.textContent = songs[slideIndex].text;
    
            slideDiv.appendChild(title);
    
            // Флаг для отслеживания первого клика
            let hasClicked = false;
    
            songWrapper.addEventListener("click", function () {
                if (!hasClicked) {
                    hasClicked = true;
    
                    // Меняем содержимое контейнера на iframe
                    const iframe = document.createElement("iframe");
                    iframe.classList.add("music__iframe");
                    iframe.src = `${songs[slideIndex].link}`;
                    iframe.frameborder = "0";
                    iframe.allow = "autoplay";
                    iframe.loading = "lazy";
                    iframe.style.width = "100%";
                    iframe.style.height = "400px";
    
                    // Очищаем songWrapper и вставляем iframe
                    songWrapper.innerHTML = "";
                    songWrapper.appendChild(iframe);
    
                    // Оставляем текст
                    title.textContent = songs[slideIndex].text;
                }
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
            sliderWrapper.innerHTML = `
                <button class="video__button"></button>
                <p class="video__title">${videos[slideIndex].title}</p>
            `;
            
            let hasClicked = false;
    
            sliderWrapper.addEventListener("click", function () {
                if (!hasClicked) {
                    hasClicked = true; 
                    sliderWrapper.innerHTML = `
                        <iframe class="video__iframe" 
                            src="${videos[slideIndex].video}?autoplay=true" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; 
                            encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                        </iframe>
                    `;
                }
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