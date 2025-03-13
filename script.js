import { songs } from "./slides.js";
import { videos } from "./slides.js";

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slidesToShow = getComputedStyle(document.documentElement).getPropertyValue('--music-columns').trim();
    console.log(slidesToShow);
    const sliderWrapper = document.getElementById("music__wrapper");
    const prevButton = document.getElementById("music__button_prev");
    const nextButton = document.getElementById("music__button_next");

    if (!sliderWrapper || !prevButton || !nextButton || !songs.length) {
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
                  <img src="${songs[slideIndex].image}" alt="Slide" class="music__image">
                  <p class="music__title">${songs[slideIndex].text}</p>
                </div>
            `;
            sliderWrapper.appendChild(slideDiv);
        }
    }

    prevButton.addEventListener("click", function () {
        index = (index - slidesToShow + songs.length) % songs.length;
        updateSlides();
    });

    nextButton.addEventListener("click", function () {
        index = (index + slidesToShow) % songs.length;
        updateSlides();
    });

    updateSlides();
});

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slidesToShow = 1;
    const sliderWrapper = document.getElementById("video__wrapper");
    const prevButton = document.getElementById("video__button_prev");
    const nextButton = document.getElementById("video__button_next");

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

    prevButton.addEventListener("click", function () {
        index = (index - slidesToShow + videos.length) % videos.length;
        updateSlides();
    });

    nextButton.addEventListener("click", function () {
        index = (index + slidesToShow) % videos.length;
        updateSlides();
    });

    updateSlides();
});

// let currentSection = 0;
// const sections = document.querySelectorAll('.section');
// let isScrolling = false; 

// window.addEventListener('wheel', (e) => {
//     if (isScrolling) return;
//     isScrolling = true;

//     if (e.deltaY > 0 && currentSection < sections.length - 1) {
//         currentSection++;
//     } else if (e.deltaY < 0 && currentSection > 0) {
//         currentSection--;
//     }

//     sections[currentSection].scrollIntoView({ behavior: 'smooth' });

//     setTimeout(() => {
//         isScrolling = false; // Разрешаем следующий скролл через 800 мс
//     }, 800);
// });
