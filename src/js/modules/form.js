// Post Data
import { postData } from './api.js';
import { closeModal } from './modal.js';
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
        postData('http://localhost:3000/requests', jsonObj) 
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