// открытие pop-up
export function popupOpen(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', popupCloseByEscape);
}

// закрытие pop-up
export function popupClose(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', popupCloseByEscape);
}

// закрытие по нажатию на Esc
export function popupCloseByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_open');
    popupClose(openedPopup);
  }
}
