



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
