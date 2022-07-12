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
        if (evt.key = 'Escape') {
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

    const modalOpenTimerId = setTimeout(openModal, 9999915000);

    window.addEventListener('scroll', openModalByScroll);

    //Class to menu cards
    const menuCardContainer = document.querySelector('.menu__field .container');
    class MenuCard {
        constructor(src, alt, title, description, price, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.classes = classes;
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
                <div class="menu__item-total"><span>${this.price}</span> грн/день
            </div>
            `
            menuCardContainer.append(card);
        }
    }

    const penis = new MenuCard(
        'img/tabs/hamburger.jpg', 
        'penis', 
        'Меню "Охуенное"', 
        'В меню "Охуенное" мы накидаем вам плотненьких, сочненьких, жилистых и каменных хуев за щеку, накормим вас самой отборной спермой и вы останетесь довольны',
         69,
        );
    penis.renderMenuCardByInnerHtml();
});