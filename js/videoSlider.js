// videoSlider.js
import { videos } from "./slides.js";

let videoIndex = 0;
const videoSlidesToShow = 1;
const videoSliderWrapper = document.querySelector(".video__wrapper");
const videoPrevButtons = document.querySelectorAll(".video__controll_prev");
const videoNextButtons = document.querySelectorAll(".video__controll_next");

if (videoSliderWrapper && videoPrevButtons.length && videoNextButtons.length && videos.length) {
    function updateVideoSlides() {
        videoSliderWrapper.innerHTML = "";
        for (let i = 0; i < videoSlidesToShow; i++) {
            const slideIndex = (videoIndex + i) % videos.length;

            videoSliderWrapper.style.backgroundImage = `url('${videos[slideIndex].image}')`;
            videoSliderWrapper.innerHTML = `
                <button class="video__button"></button>
                <p class="video__title">${videos[slideIndex].title}</p>
            `;

            let hasClicked = false;

            videoSliderWrapper.addEventListener("click", function () {
                if (!hasClicked) {
                    hasClicked = true;
                    videoSliderWrapper.innerHTML = `
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

    function prevVideoSlide() {
        videoIndex = (videoIndex - videoSlidesToShow + videos.length) % videos.length;
        updateVideoSlides();
    }

    function nextVideoSlide() {
        videoIndex = (videoIndex + videoSlidesToShow) % videos.length;
        updateVideoSlides();
    }

    videoPrevButtons.forEach(button => {
        button.addEventListener("click", prevVideoSlide);
    });

    videoNextButtons.forEach(button => {
        button.addEventListener("click", nextVideoSlide);
    });

    function addVideoSwipeSupport() {
        let startX = 0, startY = 0, endX = 0, endY = 0;

        videoSliderWrapper.addEventListener("touchstart", (e) => {
            if (window.innerWidth < 768) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            }
        });

        videoSliderWrapper.addEventListener("touchmove", (e) => {
            if (window.innerWidth < 768) {
                endX = e.touches[0].clientX;
                endY = e.touches[0].clientY;
            }
        });

        videoSliderWrapper.addEventListener("touchend", () => {
            if (window.innerWidth < 768) {
                let diffX = startX - endX;
                let diffY = startY - endY;

                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    diffX > 0 ? nextVideoSlide() : prevVideoSlide();
                }
            }
        });
    }

    addVideoSwipeSupport();
    updateVideoSlides();
}