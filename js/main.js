document.addEventListener('DOMContentLoaded', () => {
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

    const getZero = (num) => {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        return num; 
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
    }

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
        closeModal();
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
    }

    const forms = document.querySelectorAll('form');
    
    //XMLHTTPRequest
    
    const XMLHTTPRequest = () => {
        const postData = (form) => {
            form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                showLoadingMessage(form);
                const request = new XMLHttpRequest();
                request.open('POST', 'server.php');

                // request.setRequestHeader('Content-type', 'multipat/form-data');
                const formDarta = new FormData(form);
                request.send(formDarta);
                
                request.addEventListener('load', () => {
                    if (request.status === 200) {
                        createMessage(messages.succesMessage);
                        removeLoadingMessage(form);
                    } else {
                        createMessage(messages.errorMessage);
                        removeLoadingMessage(form);
                    }
                });
                form.reset();
            });
        };
        forms.forEach(form => postData(form));
    };

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
            postData('http://localhost:3000/requests', jsonObj) 
                .then((data) => {
                    console.log(data);
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
    //Рендер карточек через JSON сервер 
    const getData = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Не удалось выполнить запрос по адресу ${url}, статус: ${res.status}`);
        }
        return await res.json();
    };
    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').renderMenuCardByInnerHtml();
            });
        });
    // Slider 
    const slider = document.querySelector('.offer__slider');
    const sliderWrapper = slider.querySelector('.offer__slider-wrapper');
    const sliderField = slider.querySelector('.offer__slider-inner');
    const sliderCurrent = slider.querySelector('#current');
    const sliderTotal = slider.querySelector('#total');
    const sliderPrevious = slider.querySelector('.offer__slider-prev');
    const sliderNext = slider.querySelector('.offer__slider-next');
    const sliderPhotos = slider.querySelectorAll('.offer__slide');
    sliderTotal.textContent = getZero(sliderPhotos.length);

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

    // Slider without animation
    // const showSlidePhoto = (index) => {
    //     sliderPhotos.forEach((photo, i) => {
    //         if (i !== index) {
    //             photo.classList.add('hidden');
    //         } else {
    //             photo.classList.remove('hidden');
    //         }
    //     })
    // };
    // const togglePrevSlide = () => {
    //     if (sliderCurrent.textContent > 1) {
    //         sliderCurrent.textContent = getZero(--sliderCurrent.textContent);
    //         showSlidePhoto(sliderCurrent.textContent - 1);
    //     } else {
    //         sliderCurrent.textContent = getZero(sliderPhotos.length);
    //         showSlidePhoto(sliderPhotos.length -1);
    //     }
    // };
    // const toggleNextSlide = () => {
    //     if (sliderCurrent.textContent < sliderPhotos.length) {
    //         sliderCurrent.textContent = getZero(++sliderCurrent.textContent);
    //         showSlidePhoto(sliderCurrent.textContent - 1);
    //     } else {
    //         sliderCurrent.textContent = getZero(1);
    //         showSlidePhoto(0);
    //     }
    // };
    // showSlidePhoto(0);
    // sliderCurrent.textContent = getZero(1);
    // sliderPrevious.addEventListener('click', togglePrevSlide);
    // sliderNext.addEventListener('click', toggleNextSlide);

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

    //Калькулятор калорий
    const calories = document.querySelector('.calculating__result span');
    let sex = 'female',
        height, weight, age,
        ratio = 1.375;
    const calcCalories = () => {
        if (!sex || !height || !weight || !age || !ratio) {
            console.log(sex, height, ratio);
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
                    ratio = +evt.target.getAttribute('data-ratio');
                } else {
                    sex = evt.target.getAttribute('id');
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
                switch(element.id) {
                    case 'height':
                        height = +evt.target.value;
                        break;
                    case 'weight':
                        weight = +evt.target.value;
                        break;
                    case 'age':
                        age = +evt.target.value;
                        break;
                };
                calcCalories();
            });
        })
    };
    getDynamicData('.calculating__choose_medium');
});