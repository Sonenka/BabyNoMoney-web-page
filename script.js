import { songs } from "./slides.js";
import { videos } from "./slides.js";

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slidesToShow = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--music-columns').trim(), 10);
    console.log(slidesToShow);
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

            // Обработчик клика по обложке
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

    // Функция переключения слайдов
    function prevSlide() {
        index = (index - slidesToShow + songs.length) % songs.length;
        updateSlides();
    }

    function nextSlide() {
        index = (index + slidesToShow) % songs.length;
        updateSlides();
    }

    // Навешиваем обработчики на все кнопки "назад"
    prevButtons.forEach(button => {
        button.addEventListener("click", prevSlide);
    });

    // Навешиваем обработчики на все кнопки "вперёд"
    nextButtons.forEach(button => {
        button.addEventListener("click", nextSlide);
    });

    // --- Добавляем поддержку свайпов только на мобильных экранах ---
    function addSwipeSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        sliderWrapper.addEventListener("touchstart", (e) => {
            if (window.innerWidth < 768) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY; // Запоминаем начальную позицию по Y
            }
        });

        sliderWrapper.addEventListener("touchmove", (e) => {
            if (window.innerWidth < 768) {
                endX = e.touches[0].clientX;
                endY = e.touches[0].clientY; // Запоминаем конечную позицию по Y
            }
        });

        sliderWrapper.addEventListener("touchend", () => {
            if (window.innerWidth < 768) {
                let diffX = startX - endX; // Разница по X
                let diffY = startY - endY; // Разница по Y

                // Проверяем, что свайп был преимущественно горизонтальным
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (Math.abs(diffX) > 50) { // Минимальная дистанция для свайпа
                        if (diffX > 0) {
                            nextSlide(); // Свайп влево
                        } else {
                            prevSlide(); // Свайп вправо
                        }
                    }
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
            const slideDiv = document.createElement("div");
            const video__width = getComputedStyle(document.documentElement).getPropertyValue('--video-width').trim();
            const video__height = getComputedStyle(document.documentElement).getPropertyValue('--video-height').trim();
            slideDiv.classList.add("video__item");

            slideDiv.innerHTML = `
                <div class="video__video">
                    <img src="${videos[slideIndex].image}" alt="Thumbnail" class="video__image">
                    <button class="video__button"></button>
                    <p class="video__title">${videos[slideIndex].title}</p>
                </div>
            `;

            slideDiv.querySelector(".video__video").addEventListener("click", function () {
                slideDiv.innerHTML = `
                    <iframe class="video__iframe" width="${video__width}" height="${video__height}" src="${videos[slideIndex].video}?autoplay=true" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                `;
            });

            sliderWrapper.appendChild(slideDiv);
        }
    }

    // Функция переключения слайдов
    function prevSlide() {
        index = (index - slidesToShow + videos.length) % videos.length;
        updateSlides();
    }

    function nextSlide() {
        index = (index + slidesToShow) % videos.length;
        updateSlides();
    }

    // Навешиваем обработчики на все кнопки "назад"
    prevButtons.forEach(button => {
        button.addEventListener("click", prevSlide);
    });

    // Навешиваем обработчики на все кнопки "вперёд"
    nextButtons.forEach(button => {
        button.addEventListener("click", nextSlide);
    });

    // --- Добавляем поддержку свайпов только на мобильных экранах ---
    function addSwipeSupport() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        sliderWrapper.addEventListener("touchstart", (e) => {
            if (window.innerWidth < 768) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY; // Запоминаем начальную позицию по Y
            }
        });

        sliderWrapper.addEventListener("touchmove", (e) => {
            if (window.innerWidth < 768) {
                endX = e.touches[0].clientX;
                endY = e.touches[0].clientY; // Запоминаем конечную позицию по Y
            }
        });

        sliderWrapper.addEventListener("touchend", () => {
            if (window.innerWidth < 768) {
                let diffX = startX - endX; // Разница по X
                let diffY = startY - endY; // Разница по Y

                // Проверяем, что свайп был преимущественно горизонтальным
                if (Math.abs(diffX) > Math.abs(diffY)) {
                    if (Math.abs(diffX) > 50) { // Минимальная дистанция для свайпа
                        if (diffX > 0) {
                            nextSlide(); // Свайп влево
                        } else {
                            prevSlide(); // Свайп вправо
                        }
                    }
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