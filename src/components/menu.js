import {createElement} from "../util.js";

const templateCustomMenu = (data) => {
  const countAll = data.length;

  const countWatchlist = data.filter((item) => {
    return item.user_details.watchlist;
  }).length;


  const countHistory = data.filter((item) => {
    return item.user_details.already_watched;
  }).length;

  const countFavorites = data.filter((item) => {
    return item.user_details.favorite;
  }).length;

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies <span class="main-navigation__item-count">${countAll}</span></a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${countWatchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${countHistory}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${countFavorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export class Menu {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return templateCustomMenu(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(templateCustomMenu(this._films));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
