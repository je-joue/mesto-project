import {
  openPopup,
  closePopup,
  closeByEscape
} from '../components/modal.js';

const imagePopup = document.querySelector('#image-popup');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

// Создание новой карточки
export function addCard(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__photo');

  newCard.querySelector('.card__text').textContent = item.text;
  cardImage.src = item.link;
  cardImage.alt = item.text;

  newCard.querySelector('.card__delete-button').addEventListener('click', function() {
    newCard.remove();
  });

  newCard.querySelector('.card__like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('card__like_active');
  });

  newCard.querySelector('.card__photo').addEventListener('click', function() {
    imagePopupImg.src = item.link;
    imagePopupImg.alt = item.text;
    imagePopupCaption.textContent = item.text;
    openPopup(imagePopup);
  });

  return newCard;
}



