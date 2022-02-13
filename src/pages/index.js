import './index.css';

import Api from '../components/api.js';
import UserInfo from '../components/userinfo';
import FormValidator from '../components/formValidator.js';
import Section from '../components/section.js';
import Card from '../components/card.js';


import {
  configValidate,
  configApi,
  userSelectors,
  configCard
} from '../utils/constants.js';

import {
  openPopup,
  closePopup
} from '../components/modal.js';

// import Card, { addCard } from '../components/card.js';
// import { enableValidation } from '../components/formValidator.js';

// import {
//   getUserData,
//   getCards,
//   patchProfileData,
//   patchAvatar,
//   postNewCard
// } from '../components/api.js';

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

// API
const api = new Api(configApi);

// user info
const userInfo = new UserInfo(userSelectors);


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
const profileEditFormValidator = new FormValidator(configValidate, profileEditForm);
const addCardFormValidator = new FormValidator(configValidate, addCardForm);
const avatarEditFormValidator = new FormValidator(configValidate, avatarEditForm)

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarEditFormValidator.enableValidation();

//
const cardsList = new Section({
  renderer: (item) => {
    console.log(item);
    const card = createCard(item);
    const cardElement = card.generate();
    cardsList.addItem(cardElement);
    }
  },
  '.photo-content__cards'
);

const createCard = (cardData) => {
  const card = new Card(cardData, configCard, userId,
    {
      handleDeleteBtnClick: (cardElement, cardID) => {
        api.deleteCard(cardID)
          .then(() => {
            cardElement.remove();
          })
          .catch((err) => {
            console.log(err);
          })
      },
      handleImageClick: () => {

      },
      handleUnlike: () => {

      },
      handleLike: () => {

      }
    }
  );
  return card;
}


// Загрузка информации о пользователе и карточек с сервера
Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    cardsList.renderItems(cards);
    // cards.forEach (function(card) {
    //   photoContent.append(addCard(card));
    // });
  })
  .catch(err => console.log(err))

