/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/api.js":
/*!*******************************!*\
  !*** ./src/js/modules/api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
//Fetch 
const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await res.json();
};

const getData = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`Не удалось выполнить запрос по адресу ${url}, статус: ${res.status}`);
    }
    return await res.json();
};



/***/ }),

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ (() => {

 //Калькулятор калорий
 const calories = document.querySelector('.calculating__result span');
 if (!localStorage.getItem('sex')) {
     localStorage.setItem('sex', 'female');
 }
 if (!localStorage.getItem('ratio')) {
     localStorage.setItem('ratio', 1.375);
 }
 const setLocalStorageData = () => {
     // Set sex
     switch(localStorage.getItem('sex')) {
         case 'male':
             document.querySelector('#female').classList.remove('calculating__choose-item_active');
             document.querySelector('#male').classList.add('calculating__choose-item_active');
             break;
     };
     // Set ratio
     const ratioElements = document.querySelectorAll('.calculating__choose_big .calculating__choose-item');
     const ratio = localStorage.getItem('ratio');
     ratioElements.forEach((element) => {
         if (element.getAttribute('data-ratio') === ratio) {
             element.classList.add('calculating__choose-item_active');
         } else {
             element.classList.remove('calculating__choose-item_active');
         }
     });
     // Set inputs
     document.querySelector('#height').value = localStorage.getItem('height');
     document.querySelector('#weight').value = localStorage.getItem('weight');
     document.querySelector('#age').value = localStorage.getItem('age');
 };
 setLocalStorageData();

 const calcCalories = () => {
     const sex = localStorage.getItem('sex');
     const height = +localStorage.getItem('height');
     const weight = +localStorage.getItem('weight');
     const age = +localStorage.getItem('age');
     const ratio = +localStorage.getItem('ratio');
     if (!sex || !height || !weight || !age || !ratio) {
         calories.textContent = '____';
         return;
     }
     if (sex === 'male') {
         calories.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
     } else {
         calories.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
     }
 };
 calcCalories();

 const getStaticData = (selector, activeClass) => {
     const elements = document.querySelectorAll(`${selector} .calculating__choose-item`);
     elements.forEach((element) => {
         element.addEventListener('click', (evt) => {
             if (evt.target.getAttribute('data-ratio')) {
                 localStorage.setItem('ratio', +evt.target.getAttribute('data-ratio'));
                 // ratio = +evt.target.getAttribute('data-ratio');
             } else {
                 localStorage.setItem('sex', evt.target.getAttribute('id'));
                 // sex = evt.target.getAttribute('id');
             }
             elements.forEach((item) => {
                 item.classList.remove(activeClass);
             });
             element.classList.add(activeClass);
             calcCalories();
         });
     });
 };
 getStaticData('#gender', 'calculating__choose-item_active');
 getStaticData('.calculating__choose_big', 'calculating__choose-item_active');
 
 const getDynamicData = (selector) => {
     const elements = document.querySelectorAll(`${selector} input`);
     elements.forEach((element) => {
         element.addEventListener('input', (evt) => {
             if (element.value.match(/\D/g)) {
                 element.style.outline = '1px solid red';
             } else {
                 element.style = '';
             }
             switch(element.id) {
                 case 'height':
                     // height = +evt.target.value;
                     localStorage.setItem('height', +evt.target.value);
                     break;
                 case 'weight':
                     // weight = +evt.target.value;
                     localStorage.setItem('weight', +evt.target.value);
                     break;
                 case 'age':
                     // age = +evt.target.value;
                     localStorage.setItem('age', +evt.target.value);
                     break;
             };
             calcCalories();
         });
     })
 };
 getDynamicData('.calculating__choose_medium');

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/js/modules/api.js");
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal.js */ "./src/js/modules/modal.js");
// Post Data


const messages = {
    errorMessage: {
        bgColor: 'red',
        text: 'Произошла ошибка. Проверьте соединение с интернетом или повторите попытку позже'
    },
    succesMessage: {
        bgColor: 'green',
        text: 'Успешно отправлено!'
    }
};

const createMessage = ({bgColor, text}) => {
    const message = document.createElement('div');
    message.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: ${bgColor};
    color: white;
    font-size: 25px;
    text-align: center`;
    message.textContent = `${text}`;
    (0,_modal_js__WEBPACK_IMPORTED_MODULE_1__.closeModal)();
    document.body.append(message);
    setTimeout(() => {
        message.remove();
    }, 5000)
};

const showLoadingMessage = (form) => {
    const button = form.querySelector('button');
    button.textContent = 'Отправка...';
    button.style.paddingRigth = '46px';
    button.style.backgroundImage = 'url("img/form/spinner.svg")';
    button.style.backgroundRepeat = 'no-repeat';
    button.style.backgroundPosition = 'right 6px center';
    button.style.opacity = '0.7';
    button.disabled = true;
};

const removeLoadingMessage = (form) => {
    const button = form.querySelector('button');
    button.textContent = 'Перезвонить мне';
    button.style = '';
    button.disabled = false;
};

const forms = document.querySelectorAll('form');
const bindPostData = (form) => {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        showLoadingMessage(form);
        const formData = new FormData(form);
        //Form data to JSON 1 
        // const jsonObj = {};
        // formData.forEach((value, key) => {
        //     console.log(value, key);
        //     jsonObj[key] = value;
        // })
        //Form data to JSON 2 
        const jsonObj = JSON.stringify(Object.fromEntries(formData.entries()));
        (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postData)('http://localhost:3000/requests', jsonObj) 
            .then(() => {
                createMessage(messages.succesMessage);
            }).catch(() => {
                createMessage(messages.errorMessage);
            }).finally(() => {
                form.reset();
                removeLoadingMessage(form);
            })
    });
};
forms.forEach(form => bindPostData(form));

/***/ }),

/***/ "./src/js/modules/menu-cards.js":
/*!**************************************!*\
  !*** ./src/js/modules/menu-cards.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ "./src/js/modules/api.js");
    //Class to menu cards
    
    class MenuCard {
        constructor(src, alt, title, description, price, parentClass, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = this.usdToRub(price);
            this.classes = classes;
            this.parentClass = parentClass;
        }

        usdToRub(price) {
            return price * 60;
        }

        renderMenuCard () {
            const card = document.createElement('div');
            card.classList.add('menu__item');
            
            const cardImg = document.createElement('img');
            cardImg.src = this.src;
            cardImg.alt = this.alt;
            card.append(cardImg);

            const cardTitle = document.createElement('h3');
            cardTitle.classList.add('menu__item-subtitle');
            cardTitle.textContent = this.title;
            card.append(cardTitle);

            const cardDescription = document.createElement('div');
            cardDescription.classList.add('menu__item-descr');
            cardDescription.textContent = this.description;
            card.append(cardDescription);

            const cardDivider = document.createElement('div');
            cardDivider.classList.add('menu__item-divider');
            card.append(cardDivider);

            const cardPrice = document.createElement('div');
            cardPrice.classList.add('menu__item-price');
            const cardPriceCost = document.createElement('div');
            cardPriceCost.classList.add('menu__item-cost');
            cardPriceCost.textContent = 'Цена:';
            const cardPriceTotal = document.createElement('div');
            cardPriceTotal.classList.add('menu__item-total');
            cardPriceTotal.innerHTML = `<span>${this.price}</span> грн/день`;
            cardPrice.append(cardPriceCost);
            cardPrice.append(cardPriceTotal);
            card.append(cardPrice);
            const menuCardContainer = document.querySelector(this.parentClass);
            menuCardContainer.append(card);
        }

        renderMenuCardByInnerHtml() {
            const card = document.createElement('div');
            if (!this.classes.length) {
                this.classes.push('menu__item');
            }
            this.classes.forEach(className => card.classList.add(className));
            card.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.description}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> руб/день
            </div>
            `
            const menuCardContainer = document.querySelector(this.parentClass);
            menuCardContainer.append(card);
        }
    };
    //Рендер карточек через JSON сервер 
    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getData)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').renderMenuCardByInnerHtml();
            });
        });

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
//Modal
const modal = document.querySelector('.modal'),
moddalOpenButtons = document.querySelectorAll('[data-modal]'),
modalCloseButton = modal.querySelector('.modal__close');

const openModal = () => {
modal.classList.remove('hidden');
document.body.style.overflow = 'hidden';
clearTimeout(modalOpenTimerId);
modalCloseButton.addEventListener('click', closeModal);
document.addEventListener('keydown', (evt) => isEscKeydown(evt));
modal.addEventListener('click', (evt) => closeModalByOutsideClick(evt.target));
window.removeEventListener('scroll', openModalByScroll);
}

const openModalByScroll = () => {
if (document.documentElement.scrollTop + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
  openModal();
  window.removeEventListener('scroll', openModalByScroll);
}
}

const closeModal = () => {
modal.classList.add('hidden');
document.body.style.overflow = '';
modalCloseButton.removeEventListener('click', closeModal);
document.removeEventListener('keydown', (evt) => isEscKeydown(evt));
modal.removeEventListener('click', (evt) => closeModalByOutsideClick(evt.target));
}

const isEscKeydown = (evt) => {
if (evt.key === 'Escape') {
  closeModal();
}

};

const closeModalByOutsideClick = (target) => {
if (target.classList.contains('modal')) {
  closeModal();
}
}

moddalOpenButtons.forEach((button) => {
button.addEventListener('click', openModal);
})

const modalOpenTimerId = setTimeout(openModal, 30000);

window.addEventListener('scroll', openModalByScroll);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSlider": () => (/* binding */ createSlider)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/modules/utils.js");
 // Slider
 
 const createSlider = ({sliderSelector, wrapper, field, current, total, previous, next, sliderElement}) => {
    const slider = document.querySelector(sliderSelector);
    const sliderWrapper = slider.querySelector(wrapper);
    const sliderField = slider.querySelector(field);
    const sliderCurrent = slider.querySelector(current);
    const sliderTotal = slider.querySelector(total);
    const sliderPrevious = slider.querySelector(previous);
    const sliderNext = slider.querySelector(next);
    const sliderPhotos = slider.querySelectorAll(sliderElement);
    sliderTotal.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(sliderPhotos.length);
    try {
        // Slider with animation
      let width = window.getComputedStyle(sliderWrapper).width;
      width = +width.replace(/\D/g, '');

      sliderField.style.width = `${100 * sliderPhotos.length}%`;
      sliderField.style.display = 'flex';
      sliderField.style.transition = '0.8s all';
      sliderWrapper.style.overflow = 'hidden';
      sliderPhotos.forEach(slide => slide.style.width = `${width}px`);
      sliderTotal.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(sliderPhotos.length);
      sliderCurrent.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(1);
      let offset = 0;
      const togglePrevSlide = () => {
          if (offset === 0) {
              offset = width * (sliderPhotos.length -1);
              sliderCurrent.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(sliderPhotos.length);
              setCurrentDot();
          } else {
              offset -= width;
              sliderCurrent.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(sliderCurrent.textContent - 1);
              setCurrentDot();
          }
          sliderField.style.transform = `translateX(-${offset}px)`;
      };
      const toggleNextSlide = () => {
          if (offset === width * (sliderPhotos.length -1)) {
              offset = 0;
              sliderCurrent.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(1);
              setCurrentDot();
          } else {
              offset += width;
              sliderCurrent.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(+sliderCurrent.textContent + 1);
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
          sliderCurrent.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(dotData);
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

 


/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ (() => {

//Tabs
const tabContentList = document.querySelectorAll('.tabcontent'),
tabSelectors = document.querySelector('.tabheader__items'),
tabSelectorsList = tabSelectors.querySelectorAll('.tabheader__item');

const hideTabds = () => {
tabContentList.forEach((item) => {
  item.classList.add('hidden');
  item.classList.remove('fade');
})
tabSelectorsList.forEach((item) => {
  item.classList.remove('tabheader__item_active')
})
};
const showSelectedTab = (index = 0) => {
tabContentList[index].classList.remove('hidden');
tabContentList[index].classList.add('fade');
tabSelectorsList[index].classList.add('tabheader__item_active');
}
hideTabds();
showSelectedTab();
tabSelectors.addEventListener('click', (evt) => {
const target = evt.target;
if (target && target.classList.contains('tabheader__item')) {
  tabSelectorsList.forEach((item, index) => {
      if (target === item) {
          hideTabds();
          showSelectedTab(index);
      }
  });
}
});

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./src/js/modules/utils.js");
//Timer 

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
        days.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(total.days);
        hours.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(total.hours);
        minutes.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(total.minutes);
        seconds.textContent = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getZero)(total.seconds);
        if (total <= 0) {
            clearInterval(timeInterval);
        }
    };
};
setTime('.timer', deadline);

/***/ }),

/***/ "./src/js/modules/utils.js":
/*!*********************************!*\
  !*** ./src/js/modules/utils.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getZero": () => (/* binding */ getZero)
/* harmony export */ });
const getZero = (num) => {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    }
    return num; 
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs.js */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_tabs_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_tabs_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer.js */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal.js */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_menu_cards_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/menu-cards.js */ "./src/js/modules/menu-cards.js");
/* harmony import */ var _modules_form_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/form.js */ "./src/js/modules/form.js");
/* harmony import */ var _modules_slider_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider.js */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc.js */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_calc_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_modules_calc_js__WEBPACK_IMPORTED_MODULE_6__);








(0,_modules_slider_js__WEBPACK_IMPORTED_MODULE_5__.createSlider)({
    sliderSelector: '.offer__slider',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    current: '#current',
    total: '#total',
    previous: '.offer_slider-prev',
    next: '.offer__slider-next',
    sliderElement: '.offer__slide'
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map