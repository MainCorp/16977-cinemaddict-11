import {KEY_ESC} from "../const.js";
import {render} from "../utils/render.js";

import {Card} from "../components/card.js";
import {DetailPopup} from "../components/detail-popup.js";

export class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._card = null;
    this._popup = null;

    this._elementCard = null;
    this._elementPopup = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._body = null;
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
    this._body = document.querySelector(`body`);
    this._body.removeChild(this._elementPopup);

    document.removeEventListener(`keydown`, this._handlerKeyClosePopup);
  }

  _handlerOpenPopup() {
    this._onViewChange();

    this._body.appendChild(this._elementPopup);

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

    const updateWatchlist = (evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._card, Object.assign({}, card, {
        'user_details': {
          'watchlist': !card.user_details.watchlist,
        }
      }));
    };

    const updateWatched = (evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._card, Object.assign({}, card, {
        'user_details': {
          'already_watched': !card.user_details.already_watched,
        }
      }));
    };

    const updateFavorite = (evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._card, Object.assign({}, card, {
        'user_details': {
          'favorite': !card.user_details.favorite,
        }
      }));
    };

    this._card.setWatchlistButtonClickHandler(updateWatchlist);
    this._card.setWatchedButtonClickHandler(updateWatched);
    this._card.setFavoriteButtonClickHandler(updateFavorite);

    this._popup.setWatchlistButtonClickHandler(updateWatchlist);
    this._popup.setWatchedButtonClickHandler(updateWatched);
    this._popup.setFavoriteButtonClickHandler(updateFavorite);

    this._addEventPopup();

    return this._elementCard;
  }

  setDefaultView() {
    this._body = document.querySelector(`body`);

    if (this._body.contains(this._elementPopup)) {
      this.closePopup();
    }
  }

  render(card) {
    render(this._container, card);
  }
}
