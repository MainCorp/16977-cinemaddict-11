import {retrieveDate} from "../utils/common.js";

import {AbstractComponent} from "./abstract-component.js";

const templateCustomCard = (data) => {
  const comments = data.comments;
  const countComments = comments.length;

  const title = data.film_info.title;
  const rating = data.film_info.total_rating;
  const runtime = data.film_info.runtime;
  const genre = data.film_info.genre.join(`, `);
  const poster = data.film_info.poster;
  const description = data.film_info.description;

  const date = retrieveDate(data.film_info.release.date);
  const year = date.year;

  const isAlreadyWatched = data.user_details.already_watched ? `film-card__controls-item--active` : ``;
  const isWatchlist = data.user_details.watchlist ? `film-card__controls-item--active` : ``;
  const isFavorite = data.user_details.favorite ? `film-card__controls-item--active` : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${runtime}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${countComments} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isAlreadyWatched}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatchlist}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export class Card extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }

  getTemplate() {
    return templateCustomCard(this._card);
  }
}
