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