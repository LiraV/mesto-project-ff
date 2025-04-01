import { imageModalClose } from './modal.js';

export function createCard(nameValue, imageValue, deleteFunc, like) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = imageValue;

    deleteButton.addEventListener('click', deleteFunc);

    return cardElement;
}

export function deleteFunc(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}

export function likeFunc(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export function openImage(modalClose, evt) {
    const popup = document.querySelector('.popup_type_image')
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');

    popup.querySelector('.popup__image').src = evt.target.src;
    popup.querySelector('.popup__caption').innerText = evt.target.parentElement.querySelector('.card__title').innerText;

    
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
}