//Карточки по умолчанию
const initialCards = [
  {
    text: 'Камчатка',
    link: 'https://images.unsplash.com/photo-1535557142533-b5e1cc6e2a5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80'
  },
  {
    text: 'Красноярский край',
    link: 'https://images.unsplash.com/photo-1597125760773-b0166e249ea7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80'
  },
  {
    text: 'Сочи',
    link: 'https://images.unsplash.com/photo-1604953364318-dcf6d8273c0d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80'
  },
  {
    text: 'Москва',
    link: 'https://images.unsplash.com/photo-1612966809470-6967deb36552?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80'
  },
  {
    text: 'Хребет Ицыл',
    link: 'https://images.unsplash.com/photo-1517229349791-2af54b4cb18e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1056&q=80'
  },
  {
    text: 'Озеро Ольхон',
    link: 'https://images.unsplash.com/photo-1501675423372-9bfa95849e62?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
];

const profileEditPopup = document.querySelector('#profile-edit-popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditCloseButton = document.querySelector('#profile-edit-close');
const profileEditForm = document.querySelector('#profile-edit-form');
const addCardPopup = document.querySelector('#add-card-popup');
const cardAddButton = document.querySelector('.profile__add-button');
const addCardCloseButton = document.querySelector('#add-card-close');
const profileName = document.querySelector('.profile__name');
const profileActivity = document.querySelector('.profile__activity');
const editName = document.querySelector('#edit-name');
const editActivity = document.querySelector('#edit-activity');
const profileEditSubmitButton = profileEditPopup.querySelector('.form__submit-button');
const addCardSubmitButton = addCardPopup.querySelector('.form__submit-button');
const addCardForm = document.querySelector('#add-card-form');
const photoContent = document.querySelector('.photo-content__cards');
const cardName = document.querySelector('#card-name');
const cardLink = document.querySelector('#card-link');
const imagePopup = document.querySelector('#image-popup');
const imagePopupCloseButton = document.querySelector('#image-popup-close');

// открытие pop-up
function popupOpen(popup) {
  popup.classList.add('popup_open');
}

// закрытие pop-up
function popupClose(popup) {
  popup.classList.remove('popup_open');
}

// открытие окна редактирования профиля
profileEditButton.addEventListener('click', function() {
  popupOpen(profileEditPopup);
  editName.value = profileName.textContent;
  editActivity.value = profileActivity.textContent;
});

// закрытие окна редактирования профиля (c сохранением введенных данных)
profileEditForm.addEventListener('submit', function(event) {
  event.preventDefault();
  profileName.textContent = editName.value;
  profileActivity.textContent = editActivity.value;
  popupClose(profileEditPopup);
});

// закрытие окна редактирования профиля (без сохранения)
profileEditCloseButton.addEventListener('click', function() {
  popupClose(profileEditPopup);
});

// открытие окна "Добавить карточку"
cardAddButton.addEventListener('click', function() {
  popupOpen(addCardPopup);
});

// закрытие окна "Добавить карточку"
addCardCloseButton.addEventListener('click', function() {
  popupClose(addCardPopup);
});

// открытие pop-up с картинкой


// закрытие pop-up с картинкой
imagePopupCloseButton.addEventListener('click', function() {
  popupClose(imagePopup);
});

// Создание новой карточки
function addCard(item) {
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

// Добавление новой карточки
addCardForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const card = {
    text: cardName.value,
    link: cardLink.value
  }
  photoContent.prepend(addCard(card));
  popupClose(addCardPopup);
  addCardForm.reset();
});

// 6 карточек "из коробки"
initialCards.forEach (function(item) {
  photoContent.append(addCard(item));
});
