import {createCard, deleteFunc} from './card.js';
import { cardContainer  } from './index.js';
import { likeFunc, openImage } from './card.js';

export function modalOpen(modalClose, type) {
    const popup = document.querySelector(type)
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    popup.querySelector('.popup__close').addEventListener('click', modalClose);
    popup.addEventListener('click', function (evt) {
        if (evt.target.classList.contains('popup')) {
            modalClose();
        }
    });
    document.addEventListener('keydown', function (evt) {
        if (evt.key === 'Escape') {
            modalClose();
        }
    });
    if (type === '.popup_type_edit') {
        renderEditModal(popup);
    } else if (type === '.popup_type_new-card') {
        renderAddModal(popup);
    }
}

export function editProfileModalClose() {
    const popup = document.querySelector('.popup_type_edit');
    popup.classList.remove('popup_is-opened');
    popup.querySelector('.popup__close').removeEventListener('click', editProfileModalClose);
}

export function addModalClose() {
    const popup = document.querySelector('.popup_type_new-card')
    popup.classList.remove('popup_is-opened');
    popup.querySelector('.popup__close').removeEventListener('click', addModalClose);
}



export function imageModalClose() {
    const popup = document.querySelector('.popup_type_image')
    popup.classList.remove('popup_is-opened');
    popup.querySelector('.popup__close').removeEventListener('click', imageModalClose);
}

function renderEditModal(popup) {
    const currentName = document.querySelector('.profile__title');
    const currentJob = document.querySelector('.profile__description');

    const formElement = popup.querySelector('.popup__form');
    const nameInput = formElement.querySelector('.popup__input_type_name');
    const jobInput = formElement.querySelector('.popup__input_type_description');

    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;

    function handleFormSubmit(evt) {
        evt.preventDefault();
        document.querySelector('.profile__title').textContent = nameInput.value;
        document.querySelector('.profile__description').textContent = jobInput.value;
        editProfileModalClose();
    }

    formElement.addEventListener('submit', handleFormSubmit); 
}

function renderAddModal(popup) {
    const formElement = popup.querySelector('.popup__form');
    const nameInput = formElement.querySelector('.popup__input_type_card-name');
    const linkInput = formElement.querySelector('.popup__input_type_url');

    formElement.addEventListener('submit', function (evt) {
        console.log(nameInput.value, linkInput.value);
        evt.preventDefault();
        cardContainer.prepend(createCard(nameInput.value, linkInput.value, deleteFunc, likeFunc, openImage));
        nameInput.value = '';
        linkInput.value = '';
        addModalClose();
    })
}