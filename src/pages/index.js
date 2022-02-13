import './index.css';

import Api from '../components/api.js';
import UserInfo from '../components/userinfo';
import FormValidator from '../components/formValidator.js';
import Section from '../components/section.js';
import Card from '../components/card.js';
import Popup from '../components/popup.js';
import PopupWithImage from '../components/popupWithImage';
import PopupWithForm from '../components/popupWithForm';
import {
  editName,
  editActivity,
  profileEditButton,
  profileEditForm,
  cardAddButton,
  addCardForm,
  avatarEditButton,
  avatarEditForm,
  configValidate,
  configApi,
  userSelectors,
  configCard,
  popupSelectors,
  formSelectors,
  imagePopupSelectors
} from '../utils/constants.js';

export let userId;

// API
const api = new Api(configApi);

// user info
const userInfo = new UserInfo(userSelectors);

// попапы
const editProfilePopup = new PopupWithForm(popupSelectors.editProfilePopup, formSelectors, {
    handleFormSubmit: ({ name, activity }, event) => {
      event.submitter.textContent = 'Сохранение...';
      event.submitter.disabled = true;
      api.patchProfileData(name, activity)
        .then((res) => {
          userInfo.setUserInfo(res);
          editProfilePopup.close();
        })
        .catch((err) => {
          console.log(err);
          event.submitter.disabled = false;
        })
        .finally(() => {
          event.submitter.textContent = 'Сохранить';
        })
    }
});
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm(popupSelectors.addCardPopup, formSelectors, {
    handleFormSubmit: ({ cardName, cardLink }, event) => {
      event.submitter.textContent = 'Сохранение...';
      event.submitter.disabled = true;
      api.postNewCard(cardName, cardLink)
        .then((res) => {
          const card = createCard(res);
          const cardElement = card.generate();
          cardsList.addItem(cardElement);
          addCardPopup.close();
          event.submitter.disabled = true;
        })
        .catch((err) => {
          console.log(err);
          event.submitter.disabled = false;
        })
        .finally(() => {
          event.submitter.textContent = 'Сохранить';
        })
    }
});
addCardPopup.setEventListeners();

const editAvatarPopup = new PopupWithForm(popupSelectors.editAvatarPopup, formSelectors, {
    handleFormSubmit: ({ avatarLink }, event) => {
      event.submitter.textContent = 'Сохранение...';
      event.submitter.disabled = true;
      api.patchAvatar(avatarLink)
        .then((res) => {
          userInfo.setAvatar(res);
          editAvatarPopup.close();
          event.submitter.disabled = true;
        })
        .catch((err) => {
          console.log(err);
          event.submitter.disabled = false;
        })
        .finally(() => {
          event.submitter.textContent = 'Сохранить';
        })
    }
});
editAvatarPopup.setEventListeners();

const imagePopup = new PopupWithImage(popupSelectors.imagePopup, imagePopupSelectors);
imagePopup.setEventListeners();

// слушатели на кнопки открытия попапов
// открытие окна редактирования профиля
profileEditButton.addEventListener('click', function() {
  editProfilePopup.open();
  userInfo.getUserInfo(api.getUserData.bind(api), {
    setInputValues: (data) => {
      editName.value = data.name;
      editActivity.value = data.about;
    }
  });
});

// открытие окна "Добавить карточку"
cardAddButton.addEventListener('click', function() {
  addCardPopup.open();
});

// открытие окна "Обновить аватар"
avatarEditButton.addEventListener('click', function() {
  editAvatarPopup.open();
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
        imagePopup.open(cardData.name, cardData.link);
      },
      handleUnlike: (cardID) => {
        api.deleteLike(cardID)
          .then((res) => card.setCurrentLikeStatus(res.likes))
          .catch((err) => console.log(err))
      },
      handleLike: (cardID) => {
        api.putLike(cardID)
          .then((res) => card.setCurrentLikeStatus(res.likes))
          .catch((err) => console.log(err))
      }
    }
  );
  return card;
}


// Загрузка информации о пользователе и карточек с сервера
Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cards]) => {
    console.log(userData);
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setAvatar(userData);
    cardsList.renderItems(cards);
  })
  .catch(err => console.log(err))

