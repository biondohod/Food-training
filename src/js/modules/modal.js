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

export {closeModal};