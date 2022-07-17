    //Class to menu cards
    import {getData} from './api.js';
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
    getData('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu__field .container').renderMenuCardByInnerHtml();
            });
        });