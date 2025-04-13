//общие функции открытия и закрытия модальных окон

export function openModal(popup, clearValidation = () => {}, validationConfig = null) {
    popup.classList.add('popup_is-opened');
    clearValidation(popup.querySelector('.popup__form'), validationConfig);
    document.addEventListener('keydown', closePopupByEsc);
    popup.querySelector('.popup__close').addEventListener('click', closePopup);
}
export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);           //УДАЛЕНИЕ СЛУШАТЕЛЯ KEYDOWN
    popup.querySelector('.popup__close').removeEventListener('click', closePopup);
}
    
//Функция закрытия
export function closePopup (evt) {
    closeModal(evt.target.parentElement.parentElement);
}

//Функции закрытия по Escape
export function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}