import {KEY_ESC} from "../const.js";
import {render} from "../utils/render.js";

import {Card} from "../components/card.js";
import {DetailPopup} from "../components/detail-popup.js";

export class MovieController {
  constructor(container, onDataChange) {
    this._container = container;

    this._card = null;
    this._popup = null;

    this._elementCard = null;
    this._elementPopup = null;

    this._onDataChange = onDataChange;
  }

  _handlerClickClosePopup() {
    this.closePopup();
  }

  _handlerKeyClosePopup(evt) {
    if (evt.keyCode === KEY_ESC) {
      this.closePopup();
    }
  }

  closePopup() {
    const bodyPage = document.querySelector(`body`);

    bodyPage.removeChild(this._elementPopup);

    document.removeEventListener(`keydown`, this._handlerKeyClosePopup);
  }

  _handlerOpenPopup() {
    const bodyPage = document.querySelector(`body`);

    bodyPage.appendChild(this._elementPopup);

    this._addEventClosePopup();
  }

  _addEventClosePopup() {
    const closePopupBtn = this._elementPopup.querySelector(`.film-details__close-btn`);

    this._handlerClickClosePopup = this._handlerClickClosePopup.bind(this);
    this._handlerKeyClosePopup = this._handlerKeyClosePopup.bind(this);

    closePopupBtn.addEventListener(`click`, this._handlerClickClosePopup);
    document.addEventListener(`keydown`, this._handlerKeyClosePopup);
  }

  _addEventPopup() {
    const poster = this._elementCard.querySelector(`.film-card__poster`);
    const title = this._elementCard.querySelector(`.film-card__title`);
    const comments = this._elementCard.querySelector(`.film-card__comments`);

    this._handlerOpenPopup = this._handlerOpenPopup.bind(this);

    poster.addEventListener(`click`, this._handlerOpenPopup);
    title.addEventListener(`click`, this._handlerOpenPopup);
    comments.addEventListener(`click`, this._handlerOpenPopup);
  }

  getElement(card) {
    this._card = new Card(card);
    this._popup = new DetailPopup(card);
    this._elementCard = this._card.getElement();
    this._elementPopup = this._popup.getElement();

    const updatedWatchlist = this._onDataChange(this._card, Object.assign({}, this._card, {"watchlist": Math.random() > 0.5}));

    const updatedWatched = this._onDataChange(this._card, Object.assign({}, this._card, {"already_watched": Math.random() > 0.5}));

    const updatedFavorite = this._onDataChange(this._card, Object.assign({}, this._card, {"favorite": Math.random() > 0.5}));

    this._card.setWatchlistButtonClickHandler(updatedWatchlist);
    this._card.setWatchedButtonClickHandler(updatedWatched);
    this._card.setFavoriteButtonClickHandler(updatedFavorite);

    this._card.setWatchlistButtonClickHandler(updatedWatchlist);
    this._popup.setWatchedButtonClickHandler(updatedWatched);
    this._popup.setFavoriteButtonClickHandler(updatedFavorite);

    this._addEventPopup();

    return this._elementCard;
  }

  render(card) {
    render(this._container, card);
  }
}
