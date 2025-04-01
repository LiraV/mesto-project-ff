export function createCard(nameValue, imageValue, deleteFunc, like) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const image = cardElement.querySelector('.card__image');

    cardElement.querySelector('.card__title').textContent = nameValue;
    image.src = imageValue;
    image.alt = nameValue;

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

