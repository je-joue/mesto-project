import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSelector, inputSelector, submitBtnSelector }, { handleFormSubmit }) {
    super (popupSelector);
    this._form = this._popupElement.querySelector(formSelector);
    this._inputArray = Array.from(this._popupElement.querySelectorAll(inputSelector));
    this._submitBtn = this._popupElement.querySelector(submitBtnSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._inputData = {};
    this._inputArray.forEach(input => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      console.log(this._getInputValues());
      this._handleFormSubmit(this._getInputValues(), event);
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
