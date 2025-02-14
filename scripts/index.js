const cardContainer = document.querySelector('.places__list');
// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки
function createCard(nameValue, imageValue, deleteFunc) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = imageValue;

    deleteButton.addEventListener('click', deleteFunc);

    cardContainer.append(cardElement);
}

// @todo: Функция удаления карточки
function deleteFunc(evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (item) {
    createCard(item.name, item.link, deleteFunc);
});
