import moment from "moment";

import {COUNT_EXTRA_FILMS, COUNT_SHOW_FILM_ON_START, COUNT_SHOW_FILM_BY_BTN, SORT_TYPE} from "../const.js";

import {render} from "../utils/render.js";
import {filterRatedFilms, filterMostCommentedFilms} from "../utils/filters.js";

import {Menu} from "../components/menu.js";
import {Filter} from "../components/sort.js";
import {FilmsBoard} from "../components/films.js";
import {ExtraFilmsBoard} from "../components/extra-films.js";
import {LoadMoreBtn} from "../components/load-more-btn.js";
import {NoData} from "../components/no-data.js";
import {MovieController} from "./movie.js";

export class PageController {
  constructor(container) {
    this._container = container;
    this._menu = null;
    this._filter = null;
    this._filmsBoard = new FilmsBoard();
    this._extraRatedBoard = new ExtraFilmsBoard(`Top rated`);
    this._extraCommentedBoard = new ExtraFilmsBoard(`Most commented`);
    this._defaultMovie = null;
    this._ratedMovie = null;
    this._commentedMovie = null;
    this._movie = null;
    this._loadMoreBtn = new LoadMoreBtn();
    this.noData = new NoData();

    this.onDataChange = this._onDataChange.bind(this);
    this.onViewChange = this._onViewChange.bind(this);

    this._cards = [];
    this._showCards = [];
    this._countFilms = COUNT_SHOW_FILM_ON_START;

    this._currentType = SORT_TYPE.DEFAULT;
    this._sortElement = null;
    this._fragmentContainer = null;
  }

  _onDataChange(currentMovie, defaultCard, updatedCard) {
    const index = this._showCards.findIndex((card) => {
      return card._card === defaultCard;
    });

    if (index === -1) {
      return;
    }

    const container = currentMovie._container;
    const defaultCardElement = defaultCard.getElement();
    const newCardElement = currentMovie.getElement(updatedCard);

    this._showCards = [].concat(this._showCards.slice(0, index), currentMovie, this._showCards.slice(index + 1));

    // this._cards[index] = updatedCard;

    // console.log(index);
    // console.log(this._cards);

    container.replaceChild(newCardElement, defaultCardElement);
  }

  _onViewChange() {
    this._showCards.forEach((card) => card.setDefaultView());
  }

  getSortedCards() {
    let sortedCards = [];
    const showingCards = this._cards.slice();

    switch (this._currentType) {
      case SORT_TYPE.DEFAULT:
        sortedCards = showingCards;
        break;
      case SORT_TYPE.DATE:
        sortedCards = showingCards.sort((a, b) => {
          return Number(moment(b.film_info.release.date).format(`YYYY`)) - Number(moment(a.film_info.release.date).format(`YYYY`));
        });
        break;
      case SORT_TYPE.RATING:
        sortedCards = showingCards.sort((a, b) => {
          return Number(b.film_info.total_rating) - Number(a.film_info.total_rating);
        });
        break;
    }

    return sortedCards;
  }

  sortChangeHandler(evt) {
    evt.preventDefault();

    const filmsWrap = this._container.querySelector(`.films`);
    const filmsLists = filmsWrap.querySelector(`.films-list`);
    const filmsListsContainer = filmsLists.querySelector(`.films-list__container`);

    this._sortElement = document.querySelector(`a[data-sort-type="${this._currentType}"]`);

    const sortType = evt.target.dataset.sortType;

    if (!sortType || sortType === this._currentType) {
      return;
    }

    if (this._sortElement) {
      this._sortElement.classList.remove(`sort__button--active`);
    }

    if (this._sortElement !== evt.target) {
      evt.target.classList.add(`sort__button--active`);
      this._sortElement = evt.target;
    }

    this._currentType = sortType;

    filmsListsContainer.innerHTML = ``;

    this._loadMoreBtn.getElement().remove();
    this._loadMoreBtn = new LoadMoreBtn();
    this._countFilms = COUNT_SHOW_FILM_ON_START;
    this._loadMoreBtn._addEventShowMore(this.handlerShowCardsButtonClick.bind(this));

    const pieceSortedCards = this.getSortedCards().slice(0, COUNT_SHOW_FILM_ON_START);

    this._defaultMovie.render(this.getCardsElements(filmsListsContainer, pieceSortedCards));
    render(filmsLists, this._loadMoreBtn.getElement());
  }

  getCardsElements(container, cards) {
    this._fragmentContainer = document.createDocumentFragment();

    console.log( this._showCards);

    for (let j = 0; j < cards.length; j++) {
      this._movie = new MovieController(container, this.onDataChange, this.onViewChange);
      this._showCards.push(this._movie);
      this._fragmentContainer.appendChild(this._movie.getElement(cards[j]));
    }

    return this._fragmentContainer;
  }


  handlerShowCardsButtonClick(evt) {
    const container = evt.target.parentElement.querySelector(`.films-list__container`);
    const prevCountFilm = this._countFilms;
    this._countFilms += COUNT_SHOW_FILM_BY_BTN;

    const piece = this._cards.slice(prevCountFilm, this._countFilms);

    if (piece.length < COUNT_SHOW_FILM_BY_BTN) {
      this._loadMoreBtn.getElement().remove();
    }

    render(container, this.getCardsElements(container, piece));
  }

  render(cards) {
    this._cards = cards;
    this._menu = new Menu(cards);
    this._filter = new Filter();

    render(this._container, this._menu.getElement());
    render(this._container, this._filter.getElement());

    if (cards.length === 0) {
      render(this._container, this.noData.getElement());

      return;
    }

    this._loadMoreBtn._addEventShowMore(this.handlerShowCardsButtonClick.bind(this));
    this._filter.setSortChangeHandler(this.sortChangeHandler.bind(this));

    const collectionFilmsOnStart = cards.slice(0, COUNT_SHOW_FILM_ON_START);
    const collectionRatedFilms = filterRatedFilms(cards).slice(0, COUNT_EXTRA_FILMS);
    const collectionCommentedFilms = filterMostCommentedFilms(cards).slice(0, COUNT_EXTRA_FILMS);

    const content = this._filmsBoard.getElement();
    const topRatedFilms = collectionRatedFilms && this._extraRatedBoard.getElement();
    const mostCommentedFilms = collectionCommentedFilms && this._extraCommentedBoard.getElement();
    const filmsContainer = content.querySelector(`.films-list__container`);

    render(this._container, content);

    this._defaultMovie = new MovieController(filmsContainer);
    this._defaultMovie.render(this.getCardsElements(filmsContainer, collectionFilmsOnStart));

    const filmsWrap = this._container.querySelector(`.films`);
    const filmsLists = filmsWrap.querySelector(`.films-list`);

    render(filmsLists, this._loadMoreBtn.getElement());
    render(filmsWrap, topRatedFilms);

    if (topRatedFilms) {
      const ratedFilmsContainer = topRatedFilms.querySelector(`.films-list__container`);
      this._ratedMovie = new MovieController(ratedFilmsContainer);
      this._ratedMovie.render(this.getCardsElements(ratedFilmsContainer, collectionRatedFilms));
    }

    render(filmsWrap, mostCommentedFilms);

    if (mostCommentedFilms) {
      const commentedFilmsContainer = mostCommentedFilms.querySelector(`.films-list__container`);
      this._commentedMovie = new MovieController(commentedFilmsContainer);
      this._commentedMovie.render(this.getCardsElements(commentedFilmsContainer, collectionCommentedFilms));
    }
  }
}
