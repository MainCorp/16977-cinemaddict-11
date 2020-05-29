import {AbstractComponent} from "./abstract-component.js";

const templateCustomMenu = (data) => {
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
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${countWatchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${countHistory}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${countFavorites}</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export class Menu extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return templateCustomMenu(this._cards);
  }
}
