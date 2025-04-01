import '../pages/index.css';
import { initialCards } from './cards_data.js';
import {createCard as createCard, likeFunc, openImage} from './card.js';
import {deleteFunc as deleteFunc} from './card.js';
import {modalOpen, editProfileModalClose, addModalClose, imageModalClose} from './modal.js';

export const cardContainer = document.querySelector('.places__list');
const profile = document.querySelector('.profile');

// @todo: Темплейт карточки

// @todo: DOM узлы


// @todo: Вывести карточки на страницу
function renderCard(item, createCard) {
    cardContainer.prepend(createCard(item.name, item.link, deleteFunc, likeFunc, openImage));
}

initialCards.forEach(function (item) {
    renderCard(item, createCard);
});


//Открытие модальных окон
profile.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__edit-button')) {
        modalOpen(editProfileModalClose, '.popup_type_edit');
    }
});

profile.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('profile__add-button')) {
        modalOpen(addModalClose, '.popup_type_new-card');
    }
});

cardContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__image')) {
        openImage(imageModalClose, evt);
    }
});

//Простановка лайков
cardContainer.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__like-button')) {
        likeFunc(evt);
    }
})