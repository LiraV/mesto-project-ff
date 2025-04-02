export function createCard(nameValue, imageValue, deleteFunc, likeFunc, openModalImage) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const image = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__title').textContent = nameValue;
    image.src = imageValue;
    image.alt = nameValue;

    deleteButton.addEventListener('click', deleteFunc);

    image.addEventListener('click', function (evt) {
        openModalImage(evt);
    });


    //Простановка лайков
    likeButton.addEventListener('click', function (evt) {
        likeFunc(evt);
    });

    return cardElement;
}

export function deleteFunc(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}

export function likeFunc(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

