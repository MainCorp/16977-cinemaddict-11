import {
  COUNT_FILMS,
  COUNT_EXTRA_FILMS,
  COUNT_SHOW_FILM_ON_START,
  COUNT_SHOW_FILM_BY_BTN
} from "./const.js";

import {
  createSomeCards,
  filterRatedFilms,
  filterMostCommentedFilms,
  render
} from "./util.js";

import {generateFilmList} from "./mock/films.js";

import {Rank} from "./components/rank.js";
import {Menu} from "./components/menu.js";
import {Sort} from "./components/sort.js";
import {FilmsBoard} from "./components/films.js";
import {ExtraFilmsBoard} from "./components/extra-films.js";
import {LoadMoreBtn} from "./components/load-more-btn.js";

let countFilms = COUNT_SHOW_FILM_ON_START;


const bodyPage = document.querySelector(`body`);
const headerPage = bodyPage.querySelector(`.header`);
const mainPage = bodyPage.querySelector(`.main`);

const films = generateFilmList(COUNT_FILMS);
const collectionFilmsOnStart = films.slice(0, COUNT_SHOW_FILM_ON_START);
const collectionRatedFilms = filterRatedFilms(films).slice(0, COUNT_EXTRA_FILMS);
const collectionCommentedFilms = filterMostCommentedFilms(films).slice(0, COUNT_EXTRA_FILMS);

const fragmentDefaultFilms = createSomeCards(collectionFilmsOnStart);
const fragmentRatedFilms = createSomeCards(collectionRatedFilms);
const fragmentMostCommentedFilms = createSomeCards(collectionCommentedFilms);

const content = new FilmsBoard().getElement();
const topRatedFilms = collectionRatedFilms && new ExtraFilmsBoard(`Top rated`).getElement();
const mostCommentedFilms = collectionCommentedFilms && new ExtraFilmsBoard(`Most commented`).getElement();

render(headerPage, new Rank().getElement());
render(mainPage, new Menu(films).getElement());
render(mainPage, new Sort().getElement());
render(mainPage, content);

const filmsContainer = content.querySelector(`.films-list__container`);

render(filmsContainer, fragmentDefaultFilms);

const filmsWrap = mainPage.querySelector(`.films`);
const filmsLists = filmsWrap.querySelector(`.films-list`);

render(filmsLists, new LoadMoreBtn().getElement());

const loadMoreBtn = document.querySelector(`.films-list__show-more`);

loadMoreBtn.addEventListener(`click`, (evt) => {
  const container = evt.target.parentElement.querySelector(`.films-list__container`);
  const prevCountFilm = countFilms;
  countFilms += COUNT_SHOW_FILM_BY_BTN;

  const piece = films.slice(prevCountFilm, countFilms);

  if (piece.length < COUNT_SHOW_FILM_BY_BTN) {
    loadMoreBtn.remove();
  }

  render(container, createSomeCards(piece));
});

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
