import { deleteLike, putLike, removeCard } from "./api";

export function createCard(item, userId, deleteFunc, likeFunc, openModalImage, config, putLike, deleteLike) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const image = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCountLabel = cardElement.querySelector('.card__like-count');

    cardElement.querySelector('.card__title').textContent = item.name;
    image.src = item.link;
    image.alt = item.name;

    if (item.likes.some(like => like._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    if (userId !== item.owner._id) {
        deleteButton.classList.add('card__delete-button-inactive');
    }

    likeCountLabel.textContent = item.likes.length;
    cardElement.dataset.id = item._id;

    deleteButton.addEventListener('click', function (evt) {
        deleteFunc(evt, config)
    });

    image.addEventListener('click', function (evt) {
        openModalImage(evt);
    });


    //Простановка лайков
    likeButton.addEventListener('click', function (evt) {
        likeFunc(evt.target, config, item._id, putLike, deleteLike);

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
        .catch((err) => {
            console.log(err);
          }); 
    
}

export function likeFunc(heart, config, id, putLike, deleteLike) {
    const heart_number = heart.parentElement.querySelector('.card__like-count');
    if (heart.classList.contains('card__like-button_is-active')) {
        deleteLike(config, id)
            .then((newCard) => {
                heart.classList.remove('card__like-button_is-active');
                heart_number.textContent = newCard.likes.length;
            })
            .catch((err) => {
                console.log(err);
              }); 
    } else {
        putLike(config, id)
            .then((newCard) => {
                heart.classList.add('card__like-button_is-active');
                heart_number.textContent = newCard.likes.length;
            })
            .catch((err) => {
                console.log(err);
              }); 
    }
}

