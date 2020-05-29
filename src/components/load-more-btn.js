import {createSomeCards, render} from "../utils/render.js";
import {COUNT_SHOW_FILM_ON_START, COUNT_SHOW_FILM_BY_BTN} from "../const.js";

import {AbstractComponent} from "./abstract-component.js";

const templateCustomLoadMoreBtn = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export class LoadMoreBtn extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
    this._countFilms = COUNT_SHOW_FILM_ON_START;
  }

  _addEventShowMore() {
    this._element.addEventListener(`click`, (evt) => {
      const container = evt.target.parentElement.querySelector(`.films-list__container`);
      const prevCountFilm = this._countFilms;
      this._countFilms += COUNT_SHOW_FILM_BY_BTN;

      const piece = this._cards.slice(prevCountFilm, this._countFilms);

      if (piece.length < COUNT_SHOW_FILM_BY_BTN) {
        this._element.remove();
      }

      render(container, createSomeCards(piece));
    });
  }

  getTemplate() {
    return templateCustomLoadMoreBtn();
  }

  getElement() {
    this._element = super.getElement();
    this._addEventShowMore();

    return this._element;
  }
}
