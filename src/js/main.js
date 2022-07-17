import './modules/tabs.js';
import './modules/timer.js';
import './modules/modal.js';
import './modules/menu-cards.js';
import './modules/form.js';
import {createSlider} from './modules/slider.js';
import './modules/calc.js';

createSlider({
    sliderSelector: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    current: '#current',
    total: '#total',
    previous: '.offer_slider-prev',
    next: '.offer__slider-next',
    sliderElement: '.offer__slide'
});
