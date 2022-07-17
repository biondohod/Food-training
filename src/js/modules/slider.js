 // Slider
 import { getZero } from './utils.js';
 const createSlider = ({sliderSelector, wrapper, field, current, total, previous, next, sliderElement}) => {
    const slider = document.querySelector(sliderSelector);
    const sliderWrapper = slider.querySelector(wrapper);
    const sliderField = slider.querySelector(field);
    const sliderCurrent = slider.querySelector(current);
    const sliderTotal = slider.querySelector(total);
    const sliderPrevious = slider.querySelector(previous);
    const sliderNext = slider.querySelector(next);
    const sliderPhotos = slider.querySelectorAll(sliderElement);
    sliderTotal.textContent = getZero(sliderPhotos.length);
    try {
        // Slider with animation
      let width = window.getComputedStyle(sliderWrapper).width;
      width = +width.replace(/\D/g, '');

      sliderField.style.width = `${100 * sliderPhotos.length}%`;
      sliderField.style.display = 'flex';
      sliderField.style.transition = '0.8s all';
      sliderWrapper.style.overflow = 'hidden';
      sliderPhotos.forEach(slide => slide.style.width = `${width}px`);
      sliderTotal.textContent = getZero(sliderPhotos.length);
      sliderCurrent.textContent = getZero(1);
      let offset = 0;
      const togglePrevSlide = () => {
          if (offset === 0) {
              offset = width * (sliderPhotos.length -1);
              sliderCurrent.textContent = getZero(sliderPhotos.length);
              setCurrentDot();
          } else {
              offset -= width;
              sliderCurrent.textContent = getZero(sliderCurrent.textContent - 1);
              setCurrentDot();
          }
          sliderField.style.transform = `translateX(-${offset}px)`;
      };
      const toggleNextSlide = () => {
          if (offset === width * (sliderPhotos.length -1)) {
              offset = 0;
              sliderCurrent.textContent = getZero(1);
              setCurrentDot();
          } else {
              offset += width;
              sliderCurrent.textContent = getZero(+sliderCurrent.textContent + 1);
              setCurrentDot();
          }
          sliderField.style.transform = `translateX(-${offset}px)`;
      };
      sliderPrevious.addEventListener('click', togglePrevSlide);
      sliderNext.addEventListener('click', toggleNextSlide);

      // Точки для слайдера
      const sliderNavigation = document.createElement('ol');
      const createSliderNavigation = () => {
          sliderWrapper.style.position = 'relative';
          sliderNavigation.classList.add('carousel-indicators');
          for (let i = 0; i < sliderTotal.textContent; i++) {
              const dot = document.createElement('li');
              dot.classList.add('dot');
              dot.setAttribute('data-slide-to', i+1);
              if (i+1 == sliderCurrent.textContent) {
                  dot.style.opacity = 1;
              }
              sliderNavigation.append(dot);
          };
          sliderWrapper.append(sliderNavigation);
      };
      createSliderNavigation();
      const dotsButton = sliderNavigation.querySelectorAll('li');
      const setSlideByDot = (dot) => {
          const dotData = dot.dataset.slideTo;
          offset = width * (dotData -1);
          sliderCurrent.textContent = getZero(dotData);
          sliderField.style.transform = `translateX(-${offset}px)`;
          setCurrentDot();
      };

      dotsButton.forEach((dot) => {
          dot.addEventListener('click', (evt) => setSlideByDot(evt.target));
      });

      function setCurrentDot() {
          const index = (offset / width) + 1;
          dotsButton.forEach((dot) => {
              if (index == dot.dataset.slideTo) {
                  dot.style.opacity = 1;
              } else {
                  dot.style = '';
              }
          });
      }
    } catch(err) {
      throw new Error(`An invalid selector was passed or one of the elements does not exist on the page. Error message: ${err.message}`);
    }

 };

 export {createSlider};
