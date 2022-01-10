// открытие pop-up
export function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closeByEscape);
}

// закрытие pop-up
export function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closeByEscape);
}

// закрытие по нажатию на Esc
export function closeByEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector('.popup_open');
    closePopup(openedPopup);
  }
}
