export const avatarEditForm = document.querySelector('#avatar-edit-form');
export const avatarEditButton = document.querySelector('.profile__avatar-edit-button');
export const addCardForm = document.querySelector('#add-card-form');
export const cardAddButton = document.querySelector('.profile__add-button');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileEditForm = document.querySelector('#profile-edit-form');
export const editName = document.querySelector('#edit-name');
export const editActivity = document.querySelector('#edit-activity');

export const configApi = {
  baseURL: 'https://nomoreparties.co/v1/plus-cohort-5',
  headers: {
    authorization: '071204a8-37b5-4bc7-8cd2-03fb6dfaa49a',
    'Content-Type': 'application/json'
  }
}

export const configValidate = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__submit-button',
  inputErrorClass: 'form__item_error',
}

export const userSelectors = {
  userNameSelector: '.profile__name',
  userActivitySelector: '.profile__activity',
  userAvatarSelector: '.profile__avatar'
}

export const configCard = {
  cardTemplateSelector: '#card-template',
  cardElementSelector: '.card',
  cardImageSelector: '.card__photo',
  cardTextSelector: '.card__text',
  cardLikeCounterSelector: '.card__like-counter',
  cardDeleteBtnSelector: '.card__delete-button',
  cardLikeBtnSelector: '.card__like-button',
  cardLikeBtnActiveClass: 'card__like-button_active'
}

export const popupSelectors = {
  editProfilePopup: '#profile-edit-popup',
  addCardPopup: '#add-card-popup',
  editAvatarPopup: '#avatar-edit-popup',
  imagePopup: '.popup_image-popup'
}

export const formSelectors = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitBtnSelector: '.form__submit-button'
}

export const imagePopupSelectors = {
  imageSelector: '.popup__image',
  captionSelector: '.popup__image-caption'
}


// //Карточки по умолчанию
// export const initialCards = [
//   {
//     text: 'Камчатка',
//     link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80'
//   },
//   {
//     text: 'Красноярский край',
//     link: 'https://images.unsplash.com/photo-1597125760773-b0166e249ea7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
//   },
//   {
//     text: 'Сочи',
//     link: 'https://images.unsplash.com/photo-1604953364318-dcf6d8273c0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
//   },
//   {
//     text: 'Москва',
//     link: 'https://images.unsplash.com/photo-1612966809470-6967deb36552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80'
//   },
//   {
//     text: 'Хребет Ицыл',
//     link: 'https://images.unsplash.com/photo-1517229349791-2af54b4cb18e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1056&q=80'
//   },
//   {
//     text: 'Озеро Ольхон',
//     link: 'https://images.unsplash.com/photo-1501675423372-9bfa95849e62?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
//   }
// ];
