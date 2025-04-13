import { deleteLike, putLike, removeCard } from "./api";

export function createCard(nameValue, imageValue, deleteFunc, likeFunc, openModalImage, likeActive, removeActive, countLikes, id, config, putLike, deleteLike) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const image = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCountLabel = cardElement.querySelector('.card__like-count');

    cardElement.querySelector('.card__title').textContent = nameValue;
    image.src = imageValue;
    image.alt = nameValue;

    if (likeActive) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (!removeActive) {
        deleteButton.classList.add('card__delete-button-inactive');
    }

    likeCountLabel.textContent = countLikes;
    cardElement.dataset.id = id;

    deleteButton.addEventListener('click', function (evt) {
        deleteFunc(evt, config)
    });

    image.addEventListener('click', function (evt) {
        openModalImage(evt);
    });


    //Простановка лайков
    likeButton.addEventListener('click', function (evt) {
        likeFunc(evt.target, config, id, putLike, deleteLike);

    });

    return cardElement;
}

export function deleteFunc(evt, config) {
    
    const cardToDelete = evt.target.closest('.card');
    const id = cardToDelete.dataset.id;
    removeCard(config, id)
        .then(() => {
            cardToDelete.remove();
        })
    
}

export function likeFunc(heart, config, id, putLike, deleteLike) {
    const heart_number = heart.parentElement.querySelector('.card__like-count');
    if (heart.classList.contains('card__like-button_is-active')) {
        deleteLike(config, id)
            .then((newCard) => {
                heart.classList.remove('card__like-button_is-active');
                heart_number.textContent = newCard.likes.length;
            })
    } else {
        putLike(config, id)
            .then((newCard) => {
                heart.classList.add('card__like-button_is-active');
                heart_number.textContent = newCard.likes.length;
            })
    }
}

