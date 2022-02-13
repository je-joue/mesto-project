// import {
//   openPopup,
//   closePopup,
//   closeByEscape
// } from '../components/modal.js';

// import { userId } from '../pages/index.js';

// import {
//   deleteCard,
//   putLike,
//   deleteLike
// } from '../components/api.js';

// const imagePopup = document.querySelector('#image-popup');
// const imagePopupImg = imagePopup.querySelector('.popup__image');
// const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

// function hasMyLike(item) {
//   return item.likes.some((like) => {
//     return like._id == userId;
//   })
// }

// const configCard = {
//   cardTemplateSelector: '#card-template',
//   cardElementSelector: '.card',
//   cardImageSelector: '.card__photo',
//   cardTextSelector: '.card__text',
//   cardLikeCounterSelector: '.card__like-counter',
//   cardDeleteBtnSelector: '.card__delete-button',
//   cardLikeBtnSelector: '.card__like-button',
//   cardLikeBtnActiveClass: 'card__like-button_active'
// }

// Создание новой карточки
export default class Card {
  constructor(data, configCard, userID, handlers) {
    this._userID = userID;
    this._cardID = data._id;
    this._cardOwner = data.owner;
    this._cardName = data.name;
    this._cardImageLink = data.link;
    this._likes = data.likes;
    this._cardTemplateSelector = configCard.cardTemplateSelector;
    this._cardElementSelector = configCard.cardElementSelector;
    this._cardImageSelector = configCard.cardImageSelector;
    this._cardTextSelector = configCard.cardTextSelector;
    this._cardLikeCounterSelector = configCard.cardLikeCounterSelector;
    this._cardDeleteBtnSelector = configCard.cardDeleteBtnSelector;
    this._cardLikeBtnSelector = configCard.cardLikeBtnSelector;
    this._cardLikeBtnActiveClass = configCard.cardLikeBtnActiveClass;
    this._handleDeleteBtnClick = handlers.handleDeleteBtnClick;
    this._handleImageClick = handlers.handleImageClick;
    this._handleUnlike = handlers.handleUnlike;
    this._handleLike = handlers.handleLike;
  }

  generate() {
    this._element = this._getElement();
    this._deleteCardBtn = this._element.querySelector(this._cardDeleteBtnSelector);
    this._likeBtn = this._element.querySelector(this._cardLikeBtnSelector);
    this._cardImage = this._element.querySelector(this._cardImageSelector);
    this._element.querySelector(this._cardTextSelector).textContent = this._cardName;
    this._cardImage.src = this._cardImageLink;
    this._cardImage.alt = this._cardName;
    this._setEventListeners();
    this.setCurrentLikeStatus(this._likes);
    this._removeDeleteBtn();

    return this._element;
  }

  _getElement() {
    const cardElement = document
      .querySelector(this._cardTemplateSelector)
      .content
      .querySelector(this._cardElementSelector)
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._deleteCardBtn.addEventListener('click', () => {
      this._handleDeleteBtnClick(this._element, this._cardID);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleImageClick();
    });

    this._likeBtn.addEventListener('click', () => {
      this._toggleLike();
    });
  }

  _isOwner() {
    return this._cardOwner._id === this._userID;
  }

  _removeDeleteBtn() {
    if (!this._isOwner()) {
      this._deleteCardBtn.remove();
    }
  }

  _hasMyLike(res) {
    return res.some((like) => {
      return like._id === this._userID;
    })
  }

  setCurrentLikeStatus(res) {
    if (this._hasMyLike(res)) {
      this._likeBtn.classList.add(this._cardLikeBtnActiveClass);
    } else {
      this._likeBtn.classList.remove(this._cardLikeBtnActiveClass);
    }
    this._element.querySelector(this._cardLikeCounterSelector).textContent = res.length;
    this._likes = res;
  }

  _toggleLike() {
    if (this._hasMyLike(this._likes)) {
      this._handleUnlike(this._cardID);
    } else {
      this._handleLike(this._cardID);
    }
  }

}



// export function addCard(item) {
//   const cardTemplate = document.querySelector('#card-template').content;
//   const newCard = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardImage = newCard.querySelector('.card__photo');
//   const deleteCardBtn = newCard.querySelector('.card__delete-button');
//   const likeBtn = newCard.querySelector('.card__like-button');
//   const likeCounter = newCard.querySelector('.card__like-counter');

//   newCard.querySelector('.card__text').textContent = item.name;
//   cardImage.src = item.link;
//   cardImage.alt = item.name;
//   likeCounter.textContent = item.likes.length;

//   deleteCardBtn.addEventListener('click', function() {
//     deleteCard(item._id)
//       .then(() => {
//         newCard.remove();
//       })
//       .catch((err) => {
//         console.log(err)
//       })
//   });

//   if (userId !== item.owner._id) {
//     deleteCardBtn.remove();
//   }

//   if (hasMyLike(item)) {
//     likeBtn.classList.add('card__like-button_active')
//   }

//   likeBtn.addEventListener('click', function(event) {
//     if (hasMyLike(item)) {
//       deleteLike(item._id)
//         .then((res) => {
//           item = res;
//           event.target.classList.remove('card__like-button_active');
//           likeCounter.textContent = item.likes.length;
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     } else {
//       putLike(item._id)
//         .then((res) => {
//           item = res;
//           event.target.classList.add('card__like-button_active');
//           likeCounter.textContent = item.likes.length;
//         })
//         .catch((err) => {
//           console.log(err)
//         })
//     }
//   });

//   cardImage.addEventListener('click', function() {
//     imagePopupImg.src = item.link;
//     imagePopupImg.alt = item.name;
//     imagePopupCaption.textContent = item.name;
//     openPopup(imagePopup);
//   });

//   return newCard;
// }



