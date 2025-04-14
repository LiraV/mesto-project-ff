//ИМПОРТЫ
import '../pages/index.css';
import {createCard as createCard, likeFunc} from './card.js';
import {deleteFunc as deleteFunc} from './card.js';
import { openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getStudentsCards, uploadNewInfo, uploadNewCard, putLike, deleteLike, changeAvatar } from './api.js';

//ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
let thisUserInfo = null;
export const cardContainer = document.querySelector('.places__list');
export const profile = document.querySelector('.profile');

export const popupImage = document.querySelector('.popup_type_image');
export const popupEdit = document.querySelector('.popup_type_edit');
export const popupAdd = document.querySelector('.popup_type_new-card');
export const popupAvatar = document.querySelector('.popup_type_avatar');

export const avatarFormElement = popupAvatar.querySelector('.popup__form');

export const editFormElement = popupEdit.querySelector('.popup__form');
export const currentName = document.querySelector('.profile__title');
export const currentJob = document.querySelector('.profile__description');
export const currentAvatar = document.querySelector('.profile__image');
export const nameInput = editFormElement.querySelector('.popup__input_type_name');
export const jobInput = editFormElement.querySelector('.popup__input_type_description');
export const avatarInput = avatarFormElement.querySelector('.popup__input_type_avatar');

export const addFormElement = popupAdd.querySelector('.popup__form');

export const placeInput = addFormElement.querySelector('.popup__input_type_card-name');
export const linkInput = addFormElement.querySelector('.popup__input_type_url');
export const popups = document.querySelectorAll('.popup');

const image = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');

const popupEditBtn = document.querySelector('.profile__edit-button');
const popupAddBtn  = document.querySelector('.profile__add-button');
const popupAvatarBtn = document.querySelector('.avatar-button');
const popupCloseBtn = document.querySelector('.popup__close');

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }

export const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
    headers: {
      authorization: 'a78dafad-3330-42b7-8432-e41175fdc7b6',
      'Content-Type': 'application/json'
    }
  }

//Вывод карточек с сервера и вывод инфы в шапку
function renderHeader(userInfo) {
    currentName.textContent = userInfo.name;
    currentJob.textContent = userInfo.about;
    currentAvatar.src = userInfo.avatar;
}

function renderCard(item, userId, deleteFunc, likeFunc, openModalImage, config, putLike, deleteLike) {
    cardContainer.prepend(createCard(item, userId, deleteFunc, likeFunc, openModalImage, config, putLike, deleteLike));
}

Promise.all([getStudentsCards(config), getUserInfo(config)])
  .then(([cards, userInfo]) => {
    thisUserInfo = userInfo;        //СОХРАНЕНИЕ ИНФЫ ПОЛЬЗОВАТЕЛЯ В ГЛОБАЛЬНУЮ 
    editFormElement.addEventListener('submit', handleFormSubmitEdit); 
    addFormElement.addEventListener('submit', handlerFormSubmitAdd);
    avatarFormElement.addEventListener('submit', handleFormSubmitAvatar);
    renderHeader(userInfo);
    cards.forEach(function (item) {
        renderCard(item, userInfo._id, deleteFunc, likeFunc, openModalImage, config, putLike, deleteLike);
    });
  })
  .catch((err) => {
    console.log(err);
  }); 


//Слушатель кликов
popupEditBtn.addEventListener('click', openModalEdit);
popupAddBtn.addEventListener('click', openModalAdd);
popupAvatarBtn.addEventListener('click', openModalAvatar);


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

//Функции открытия конкретных модальных окон
export function openModalEdit() {
    nameInput.value = currentName.textContent;
    jobInput.value = currentJob.textContent;
    clearValidation(editFormElement, validationConfig);
    openModal(popupEdit);
}

export function openModalAdd() {
    placeInput.value = '';
    linkInput.value = '';
    clearValidation(addFormElement, validationConfig);
    openModal(popupAdd);
}

export function openModalAvatar() {
    clearValidation(avatarFormElement, validationConfig);
    openModal(popupAvatar);
}

export function openModalImage(evt) {
    openModal(popupImage);
    image.src = evt.target.src;
    image.alt = evt.target.parentElement.querySelector('.card__title').innerText;
    imageCaption.innerText = evt.target.parentElement.querySelector('.card__title').innerText;
}

//Обработчик формы Add
function handlerFormSubmitAdd(evt) {
    evt.preventDefault();
    evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
    uploadNewCard(config, placeInput.value, linkInput.value)
    .then((item) => {
            cardContainer.prepend(createCard(item, thisUserInfo._id, deleteFunc, likeFunc, openModalImage, config, putLike, deleteLike));
            addFormElement.reset();
            closeModal(evt.target.parentElement.parentElement);
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        evt.target.querySelector('.popup__button').textContent = 'Сохранить';
    });
}

//Обработчик формы Edit
function handleFormSubmitEdit(evt) {
    evt.preventDefault();
    evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
    uploadNewInfo(config, nameInput.value, jobInput.value)
    .then(() => {
        currentName.textContent = nameInput.value;
        currentJob.textContent = jobInput.value;
        closeModal(evt.target.parentElement.parentElement);
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        evt.target.querySelector('.popup__button').textContent = 'Сохранить';
    }); 

}

//Обработчик формы Avatar
function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    evt.target.querySelector('.popup__button').textContent = 'Сохранение...';
    changeAvatar(config, avatarInput.value)
    .then(() => {
        currentAvatar.src = avatarInput.value;
        closeModal(evt.target.parentElement.parentElement);
    })
    .catch((err) => {
        console.log(err);
      })
    .finally(() => {
        evt.target.querySelector('.popup__button').textContent = 'Сохранить';
    });

}

//Валидация
  enableValidation(validationConfig);