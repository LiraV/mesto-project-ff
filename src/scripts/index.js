//ИМПОРТЫ
import '../pages/index.css';
import { initialCards } from './cards_data.js';
import {createCard as createCard, likeFunc} from './card.js';
import {deleteFunc as deleteFunc} from './card.js';
import { openModal, closeModal, closePopupByEsc } from './modal.js';

//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
export const cardContainer = document.querySelector('.places__list');
export const profile = document.querySelector('.profile');

export const popupImage = document.querySelector('.popup_type_image');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_new-card');
const popupCloseBtn = document.querySelector('.popup__close');

export const editFormElement = popupEdit.querySelector('.popup__form');
export const currentName = document.querySelector('.profile__title');
export const currentJob = document.querySelector('.profile__description');
export const nameInput = editFormElement.querySelector('.popup__input_type_name');
export const jobInput = editFormElement.querySelector('.popup__input_type_description');

export const addFormElement = popupAdd.querySelector('.popup__form');

export const placeInput = addFormElement.querySelector('.popup__input_type_card-name');
export const linkInput = addFormElement.querySelector('.popup__input_type_url');
export const popups = document.querySelectorAll('.popup');

// @todo: Вывести карточки на страницу
function renderCard(item, createCard) {
    cardContainer.prepend(createCard(item.name, item.link, deleteFunc, likeFunc, openModalImage));
}
initialCards.forEach(function (item) {
    renderCard(item, createCard);
});


//Слушатель кликов
document.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__edit-button')) { //открытие модальных окон
        openModalEdit();
    } else if(evt.target.classList.contains('profile__add-button')) {
        openModalAdd();
    } else if(evt.target.classList.contains('card__image')) {
        openModalImage(evt);
    } else if(evt.target.classList.contains('popup__close')) { //закрытие модальных окон
        closeModal(evt.target.parentElement.parentElement);
    }
});

//Слушатель кликов в попапе
popupImage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
});

popupAdd.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
});

popupEdit.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
});

//Слушатель клавиатуры
document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
        closePopupByEsc(popups);
    }
});



//Простановка лайков
cardContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-button')) {
        likeFunc(evt);
    }
})

//Функции открытия конкретных модальных окон
export function openModalEdit() {
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
    openModal(popupEdit);
    editFormElement.addEventListener('submit', handleFormSubmitEdit); 
}

export function openModalAdd() {
    openModal(popupAdd);
    addFormElement.addEventListener('submit', handlerFormSubmitAdd)
}

export function openModalImage(evt) {
    openModal(popupImage);
    const image = popupImage.querySelector('.popup__image');
    popupImage.classList.add('popup_is-opened');

    image.src = evt.target.src;
    image.alt = evt.target.parentElement.querySelector('.card__title').innerText;
    popupImage.querySelector('.popup__caption').innerText = evt.target.parentElement.querySelector('.card__title').innerText;
}

//Обработчик формы Add
function handlerFormSubmitAdd(evt) {
    evt.preventDefault();
    cardContainer.prepend(createCard(placeInput.value, linkInput.value, deleteFunc, likeFunc, openModalImage));
    addFormElement.reset();
    closeModal(evt.target.parentElement.parentElement);
}

//Обработчик формы Edit
function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    currentName.textContent = nameInput.value;
    currentJob.textContent = jobInput.value;
    closeModal(evt.target.parentElement.parentElement);
}

