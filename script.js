import { songs } from "./slides.js";
import { videos } from "./slides.js";

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slidesToShow = 3;
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
                <button class="music__button button">LISTEN NOW</button>
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

    const slides = [
        {
            image: "https://img.youtube.com/vi/FmlGo1KY2jE/maxresdefault.jpg",
            video: "https://www.youtube.com/embed/FmlGo1KY2jE",
            title: "Antidepressant"
        },
        {
            image: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg",
            video: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
            title: "Relaxing Vibes"
        },
        {
            image: "https://img.youtube.com/vi/tgbNymZ7vqY/maxresdefault.jpg",
            video: "https://www.youtube.com/embed/tgbNymZ7vqY",
            title: "Morning Energy"
        },
    ];

    function updateSlides() {
        sliderWrapper.innerHTML = "";
        for (let i = 0; i < slidesToShow; i++) {
            const slideIndex = (index + i) % videos.length;
            const slideDiv = document.createElement("div");
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
                    <iframe width="960" height="540" src="${videos[slideIndex].video}?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
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
