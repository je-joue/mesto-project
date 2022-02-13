export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', (event) => {
      const isCloseButtonClicked = event.target.classList.contains('popup__close-button');
      const isOverlayClicked = event.target.classList.contains('popup_open');
      if (isCloseButtonClicked || isOverlayClicked) {
        this.close();
      }
    });
  }

  open() {
    this._popupElement.classList.add('popup_open');
    window.addEventListener('keydown', this._closeByEscape);
  }

  close() {
    this._popupElement.classList.remove('popup_open');
    window.removeEventListener('keydown', this._closeByEscape);
  }

  _closeByEscape = (event) => {
    if (event.key === "Escape") {
      this.close();
    }
  }
}
