



//общие функции открытия и закрытия модальных окон

export function openModal(popup) {
    popup.classList.add('popup_is-opened');
}
export function closeModal(element) {
    element.classList.remove('popup_is-opened');
}
    
//Функции закрытия по Escape
export function closePopupByEsc(popups) {
    popups.forEach(element => {
        closeModal(element);
    });
}


//Закрытие попапов

/*popupImage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
});

popupEdit.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
});

popupAdd.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(evt.target);
    }
});*/

/*document.addEventListener('keydown', closePopupByEsc(evt));*/
