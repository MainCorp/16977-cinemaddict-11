import {KEY_ESC} from "../const.js";
import {render} from "../utils/render.js";

import {Card} from "../components/card.js";
import {DetailPopup} from "../components/detail-popup.js";
import {Emoji} from "../components/emoji.js";

export class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;

    this._card = null;
    this._popup = null;
    this._emoji = null;
    this._filmData = null;
    this._currentEmoji = null;

    this._elementCard = null;
    this._elementPopup = null;

    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._updateWatchlist = null;
    this._updateWatched = null;
    this._updateFavorite = null;

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
    this._elementPopup = null;
  }

  _handlerOpenPopup() {
    this._onViewChange();

    this._popup = new DetailPopup(this._filmData);
    this._emoji = new Emoji();

    this._popup.setWatchlistButtonClickHandler(this._updateWatchlist);
    this._popup.setWatchedButtonClickHandler(this._updateWatched);
    this._popup.setFavoriteButtonClickHandler(this._updateFavorite);

    this._elementPopup = this._popup.getElement();

    this._emoji.setCurrentElement(this._currentEmoji);
    this._emojiElement = this._emoji.getElement();

    this._popup.addEmojiButtons(this._emojiElement);
    this._popup._subscribeOnEvents();

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

  getElement(filmData) {
    this._filmData = filmData;
    this._card = new Card(this._filmData);

    this._updateWatchlist = (evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._card, Object.assign({}, this._filmData, {
        'user_details': {
          'watchlist': !this._filmData.user_details.watchlist,
          'already_watched': this._filmData.user_details.already_watched,
          'favorite': this._filmData.user_details.favorite,
        }
      }));
    };

    this._updateWatched = (evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._card, Object.assign({}, this._filmData, {
        'user_details': {
          'watchlist': this._filmData.user_details.watchlist,
          'already_watched': !this._filmData.user_details.already_watched,
          'favorite': this._filmData.user_details.favorite,
        }
      }));
    };

    this._updateFavorite = (evt) => {
      evt.preventDefault();

      this._onDataChange(this, this._card, Object.assign({}, this._filmData, {
        'user_details': {
          'watchlist': this._filmData.user_details.watchlist,
          'already_watched': this._filmData.user_details.already_watched,
          'favorite': !this._filmData.user_details.favorite,
        }
      }));
    };

    this._card.setWatchlistButtonClickHandler(this._updateWatchlist);
    this._card.setWatchedButtonClickHandler(this._updateWatched);
    this._card.setFavoriteButtonClickHandler(this._updateFavorite);

    this._elementCard = this._card.getElement();

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
