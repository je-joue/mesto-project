import {
  openPopup,
  closePopup,
  closeByEscape
} from '../components/modal.js';

import { userId } from '../pages/index.js';

import {
  deleteCard,
  putLike,
  deleteLike
} from '../components/api.js';

const imagePopup = document.querySelector('#image-popup');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

function hasMyLike(item) {
  return item.likes.some((like) => {
    return like._id == userId;
  })
}

// Создание новой карточки
export function addCard(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__photo');
  const deleteCardBtn = newCard.querySelector('.card__delete-button');
  const likeBtn = newCard.querySelector('.card__like-button');
  const likeCounter = newCard.querySelector('.card__like-counter');

  newCard.querySelector('.card__text').textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.name;
  likeCounter.textContent = item.likes.length;

  deleteCardBtn.addEventListener('click', function(event) {
    deleteCard(item._id)
      .then(() => {
        newCard.remove();
      })
      .catch((err) => {
        console.log(err)
      })
  });

  if (userId !== item.owner._id) {
    deleteCardBtn.remove();
  }

  if (hasMyLike(item)) {
    likeBtn.classList.add('card__like-button_active')
  }

  likeBtn.addEventListener('click', function(event) {
    if (hasMyLike(item)) {
      deleteLike(item._id)
        .then((res) => {
          item = res;
          event.target.classList.remove('card__like-button_active');
          likeCounter.textContent = item.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      putLike(item._id)
        .then((res) => {
          item = res;
          event.target.classList.add('card__like-button_active');
          likeCounter.textContent = item.likes.length;
        })
        .catch((err) => {
          console.log(err)
        })
    }
  });

  cardImage.addEventListener('click', function() {
    imagePopupImg.src = item.link;
    imagePopupImg.alt = item.name;
    imagePopupCaption.textContent = item.name;
    openPopup(imagePopup);
  });

  return newCard;
}



