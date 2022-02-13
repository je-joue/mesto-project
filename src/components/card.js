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

  _hasMyLike(likes) {
    return likes.some((like) => {
      return like._id === this._userID;
    })
  }

  setCurrentLikeStatus(likes) {
    if (this._hasMyLike(likes)) {
      this._likeBtn.classList.add(this._cardLikeBtnActiveClass);
    } else {
      this._likeBtn.classList.remove(this._cardLikeBtnActiveClass);
    }
    this._element.querySelector(this._cardLikeCounterSelector).textContent = likes.length;
    this._likes = likes;
  }

  _toggleLike() {
    if (this._hasMyLike(this._likes)) {
      this._handleUnlike(this._cardID);
    } else {
      this._handleLike(this._cardID);
    }
  }

}
