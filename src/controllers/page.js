import {
  COUNT_EXTRA_FILMS,
  COUNT_SHOW_FILM_ON_START
} from "../const.js";

import {createSomeCards, render} from "../utils/render.js";

import {filterRatedFilms, filterMostCommentedFilms} from "../utils/sort.js";

import {Menu} from "../components/menu.js";
import {Filter} from "../components/sort.js";
import {FilmsBoard} from "../components/films.js";
import {ExtraFilmsBoard} from "../components/extra-films.js";
import {LoadMoreBtn} from "../components/load-more-btn.js";
import {NoData} from "../components/no-data.js";

export class PageController {
  constructor(container) {
    this._container = container;
    this._menu = null;
    this._filter = null;
    this._filmsBoard = new FilmsBoard();
    this._extraRatedBoard = new ExtraFilmsBoard(`Top rated`);
    this._extraCommentedBoard = new ExtraFilmsBoard(`Most commented`);
    this._loadMoreBtn = null;
    this.noData = new NoData();
  }

  render(cards) {
    this._menu = new Menu(cards);
    this._filter = new Filter(cards);

    render(this._container, this._menu.getElement());
    render(this._container, this._filter.getElement());

    if (cards.length) {
      this._loadMoreBtn = new LoadMoreBtn(cards);

      const collectionFilmsOnStart = cards.slice(0, COUNT_SHOW_FILM_ON_START);
      const collectionRatedFilms = filterRatedFilms(cards).slice(0, COUNT_EXTRA_FILMS);
      const collectionCommentedFilms = filterMostCommentedFilms(cards).slice(0, COUNT_EXTRA_FILMS);

      const fragmentDefaultFilms = createSomeCards(collectionFilmsOnStart);
      const fragmentRatedFilms = createSomeCards(collectionRatedFilms);
      const fragmentMostCommentedFilms = createSomeCards(collectionCommentedFilms);

      const content = this._filmsBoard.getElement();
      const topRatedFilms = collectionRatedFilms && this._extraRatedBoard.getElement();
      const mostCommentedFilms = collectionCommentedFilms && this._extraCommentedBoard.getElement();
      const filmsContainer = content.querySelector(`.films-list__container`);

      render(this._container, content);
      render(filmsContainer, fragmentDefaultFilms);

      const filmsWrap = this._container.querySelector(`.films`);
      const filmsLists = filmsWrap.querySelector(`.films-list`);

      render(filmsLists, this._loadMoreBtn.getElement());

      render(filmsWrap, topRatedFilms);

      if (topRatedFilms) {
        const ratedFilmsContainer = topRatedFilms.querySelector(`.films-list__container`);
        render(ratedFilmsContainer, fragmentRatedFilms);
      }

      render(filmsWrap, mostCommentedFilms);

      if (mostCommentedFilms) {
        const commentedFilmsContainer = mostCommentedFilms.querySelector(`.films-list__container`);
        render(commentedFilmsContainer, fragmentMostCommentedFilms);
      }

    } else {
      render(this._container, this.noData.getElement());
    }
  }
}
