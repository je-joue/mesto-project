import './index.css';

import {
  configValidate,
  configApi
} from '../components/constants.js';

import {
  openPopup,
  closePopup
} from '../components/modal.js';

import { addCard } from '../components/card.js';
import { enableValidation } from '../components/validate.js';
import {
  getUserData,
  getCards,
  patchProfileData,
  patchAvatar,
  postNewCard
} from '../components/api.js';

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
const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
const avatarEditPopup = document.querySelector('#avatar-edit-popup');
const avatarEditForm = document.querySelector('#avatar-edit-form');
const avatarLink = document.querySelector('#avatar-link');
const avatar = document.querySelector('.profile__avatar');

export let userId;

// открытие окна редактирования профиля
profileEditButton.addEventListener('click', function() {
  openPopup(profileEditPopup);
  editName.value = profileName.textContent;
  editActivity.value = profileActivity.textContent;
});

// открытие окна "Добавить карточку"
cardAddButton.addEventListener('click', function() {
  openPopup(addCardPopup);
});

// открытие окна "Обновить аватар"
avatarEditButton.addEventListener('click', function() {
  openPopup(avatarEditPopup);
});

// закрытие pop-up
popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    const isCloseButtonClicked = event.target.classList.contains('popup__close-button');
    const isOverlayClicked = event.target.classList.contains('popup_open');
    if (isCloseButtonClicked || isOverlayClicked) {
      closePopup(popup);
    }
  });
});

// закрытие окна редактирования профиля (c сохранением введенных данных)
profileEditForm.addEventListener('submit', function(event) {
  event.submitter.textContent = 'Сохранение...'
  event.submitter.disabled = true;
  patchProfileData(editName.value, editActivity.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileActivity.textContent = res.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
      event.submitter.disabled = false;
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
});

// Обновление аватара
avatarEditForm.addEventListener('submit', function(event) {
  event.submitter.textContent = 'Сохранение...';
  event.submitter.disabled =  true;
  patchAvatar(avatarLink.value)
    .then((res) => {
      avatar.src = res.avatar;
      closePopup(avatarEditPopup);
      avatarEditForm.reset();
      event.submitter.disabled = true;
    })
    .catch((err) => {
      console.log(err);
      event.submitter.disabled = false;
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
});

// Добавление новой карточки
addCardForm.addEventListener('submit', function(event) {
  event.submitter.textContent = 'Сохранение...';
  event.submitter.disabled = true;
  postNewCard(cardName.value, cardLink.value)
    .then((res) => {
      console.log(res);
      photoContent.prepend(addCard(res));
      closePopup(addCardPopup);
      addCardForm.reset();
      event.submitter.disabled = true;
    })
    .catch((err) => {
      console.log(err);
      event.submitter.disabled = false;
    })
    .finally(() => {
      event.submitter.textContent = 'Сохранить';
    })
});



// Валидация
enableValidation(configValidate);

// Загрузка информации о пользователе и карточек с сервера
Promise.all([getUserData(), getCards()])
  .then(([userData, cards]) => {
    console.log(userData);
    console.log(cards);
    userId = userData._id;
    profileName.textContent = userData.name;
    profileActivity.textContent = userData.about;
    avatar.src = userData.avatar;
    cards.forEach (function(card) {
      photoContent.append(addCard(card));
    });
  })
  .catch(err => console.log(err))

