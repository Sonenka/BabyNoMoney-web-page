// musicSlider.js
import { songs } from "./slides.js";

let index = 0;
const slidesToShow = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--music-columns').trim(), 10);
const sliderWrapper = document.querySelector(".music__wrapper");
const prevButtons = document.querySelectorAll(".music__controll_prev");
const nextButtons = document.querySelectorAll(".music__controll_next");

if (!sliderWrapper || !prevButtons.length || !nextButtons.length || !songs.length) {
    console.error("Slider elements or slides data not found!");
} else {
    function updateSlides() {
        sliderWrapper.innerHTML = "";
        for (let i = 0; i < slidesToShow; i++) {
            const slideIndex = (index + i) % songs.length;
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("music__item");

            const songWrapper = document.createElement("div");
            songWrapper.classList.add("music__song-wrapper");

            const img = document.createElement("img");
            img.src = songs[slideIndex].image;
            img.alt = "Slide";
            img.classList.add("music__image");

            const button = document.createElement("button");
            button.classList.add("music__button-img");

            songWrapper.appendChild(img);
            songWrapper.appendChild(button);

            slideDiv.appendChild(songWrapper);

            const title = document.createElement("p");
            title.classList.add("music__title");
            title.textContent = songs[slideIndex].text;

            slideDiv.appendChild(title);

            let hasClicked = false;

            songWrapper.addEventListener("click", function () {
                if (!hasClicked) {
                    hasClicked = true;

                    const iframe = document.createElement("iframe");
                    iframe.classList.add("music__iframe");
                    iframe.src = `${songs[slideIndex].link}`;
                    iframe.frameborder = "0";
                    iframe.allow = "autoplay";
                    iframe.loading = "lazy";
                    iframe.style.width = "100%";
                    iframe.style.height = "400px";

                    songWrapper.innerHTML = "";
                    songWrapper.appendChild(iframe);

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
}