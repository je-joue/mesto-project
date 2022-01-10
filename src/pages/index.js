import './index.css';

import {
  configValidate,
  initialCards
} from '../components/constants.js';

import {
  popupOpen,
  popupClose
  // popupCloseByEscape
} from '../components/modal.js';

import { addCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js';

const profileEditPopup = document.querySelector('#profile-edit-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditForm = document.querySelector('#profile-edit-form');
const addCardPopup = document.querySelector('#add-card-popup');
const cardAddButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const editName = document.querySelector('#edit-name');
const editActivity = document.querySelector('#edit-activity');
const addCardForm = document.querySelector('#add-card-form');
const photoContent = document.querySelector('.photo-content__cards');
const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-link');
const popups = document.querySelectorAll('.popup');

// открытие окна редактирования профиля
profileEditButton.addEventListener('click', function() {
  popupOpen(profileEditPopup);
  editName.value = profileName.textContent;
  editActivity.value = profileActivity.textContent;
});

// открытие окна "Добавить карточку"
cardAddButton.addEventListener('click', function() {
  popupOpen(addCardPopup);
});

// закрытие окна редактирования профиля (c сохранением введенных данных)
profileEditForm.addEventListener('submit', function(event) {
  profileName.textContent = editName.value;
  profileActivity.textContent = editActivity.value;
  popupClose(profileEditPopup);
});

// закрытие pop-up
popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    const isCloseButtonClicked = event.target.classList.contains('popup__close-button');
    const isOverlayClicked = event.target.classList.contains('popup_open');
    if (isCloseButtonClicked || isOverlayClicked) {
      popupClose(popup);
    }
  });
});

// 6 карточек "из коробки"
initialCards.forEach (function(item) {
  photoContent.append(addCard(item));
});

// Добавление новой карточки
addCardForm.addEventListener('submit', function(event) {
  const card = {
    text: cardName.value,
    link: cardLink.value
  }
  photoContent.prepend(addCard(card));
  popupClose(addCardPopup);
  addCardForm.reset();
});

enableValidation(configValidate);
