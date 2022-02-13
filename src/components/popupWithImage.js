import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, { imageSelector, captionSelector }) {
    super (popupSelector);
    this._image = this._popupElement.querySelector(imageSelector);
    this._imagePopupCaption = this._popupElement.querySelector(captionSelector);
  }

  open(imageName, imageLink) {
    super.open();
    this._imagePopupCaption.textContent = imageName;
    this._image.src = imageLink;
    this._image.alt = imageName;
  }
}
