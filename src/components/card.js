import {
  popupOpen,
  popupClose,
  popupCloseByEscape
} from '../components/modal.js';

const imagePopup = document.querySelector('#image-popup');

// Создание новой карточки
export function addCard(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  newCard.querySelector('.card__text').textContent = item.text;
  newCard.querySelector('.card__photo').src = item.link;
  newCard.querySelector('.card__photo').alt = item.text;

  newCard.querySelector('.card__delete-button').addEventListener('click', function() {
    newCard.querySelector('.card__delete-button').closest('.card').remove();
  });

  newCard.querySelector('.card__like').addEventListener('click', function() {
    newCard.querySelector('.card__like').classList.toggle('card__like_active');
  });

  newCard.querySelector('.card__photo').addEventListener('click', function() {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupImageCaption = imagePopup.querySelector('.popup__image-caption');
    popupImage.src = item.link;
    popupImage.alt = item.text;
    popupImageCaption.textContent = item.text;
    popupOpen(imagePopup);
  });

  return newCard;
}



