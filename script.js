import { slides } from "./slides.js";

document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    const slidesToShow = 3;
    const sliderWrapper = document.getElementById("slider__wrapper");
    const prevButton = document.getElementById("slider__button_prev");
    const nextButton = document.getElementById("slider__button_next");

    if (!sliderWrapper || !prevButton || !nextButton || !slides.length) {
      console.error("Slider elements or slides data not found!");
      return;
    }

    function updateSlides() {
        sliderWrapper.innerHTML = "";
        for (let i = 0; i < slidesToShow; i++) {
            const slideIndex = (index + i) % slides.length;
            const slideDiv = document.createElement("div");
            slideDiv.classList.add("slide__item");
            slideDiv.innerHTML = `
                <div class="slide__song">
                  <img src="${slides[slideIndex].image}" alt="Slide" class="slide__image">
                  <p class="slide__title">${slides[slideIndex].text}</p>
                </div>
                <button class="slide__button button">LISTEN NOW</button>
            `;
            sliderWrapper.appendChild(slideDiv);
        }
    }

    prevButton.addEventListener("click", function () {
        index = (index - slidesToShow + slides.length) % slides.length;
        updateSlides();
    });

    nextButton.addEventListener("click", function () {
        index = (index + slidesToShow) % slides.length;
        updateSlides();
    });

    updateSlides();
});