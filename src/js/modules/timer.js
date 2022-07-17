//Timer 
import { getZero } from './utils.js';
const deadline = '2022-08-20';
const getTime = (endtime) => {
    let days, hours, minutes, seconds;
    const total = Date.parse(endtime) - new Date();
    if (total <= 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    } else {
        days = Math.floor(total / (1000 * 60 * 60 * 24));
        hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((total / (1000 * 60)) % 60);
        seconds = Math.floor((total / 1000) % 60);
    }
    
    return {
        'total': total,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
};

const setTime = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(editTimer, 1000);
    editTimer();
    function editTimer() {
        const total = getTime(endtime);
        days.textContent = getZero(total.days);
        hours.textContent = getZero(total.hours);
        minutes.textContent = getZero(total.minutes);
        seconds.textContent = getZero(total.seconds);
        if (total <= 0) {
            clearInterval(timeInterval);
        }
    };
};
setTime('.timer', deadline);