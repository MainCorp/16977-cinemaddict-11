import {COUNT_FILMS, COUNT_EXTRA_FILMS, COUNT_SHOW_FILM_ON_START, COUNT_SHOW_FILM_BY_BTN} from "./const.js";
import {createSomeCards, filterRatedFilms, filterMostCommentedFilms, generateCollectionComments} from "./util.js";

import {generateFilmList} from "./mock/films.js";

import {templateCustomRank} from "./components/rank.js";
import {templateCustomMenu} from "./components/menu.js";
import {templateCustomSort} from "./components/sort.js";
import {templateCustomCard} from "./components/card.js";
import {templateCustomLoadMoreBtn} from "./components/load-more-btn.js";
import {templateCustomDetailPopup} from "./components/detail-popup.js";
import {templateCustomFilms} from "./components/films.js";
import {templateCustomExtraFilms} from "./components/extra-films.js";

let countFilms = COUNT_SHOW_FILM_ON_START;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const bodyPage = document.querySelector(`body`);
const headerPage = bodyPage.querySelector(`.header`);
const mainPage = bodyPage.querySelector(`.main`);

const films = generateFilmList(COUNT_FILMS);

const strDefaultFilms = createSomeCards(templateCustomCard, films, countFilms);
const strTopRatedFilms = createSomeCards(templateCustomCard, filterRatedFilms(films), COUNT_EXTRA_FILMS, `film_info.total_rating`);
const strMostCommentedFilms = createSomeCards(templateCustomCard, filterMostCommentedFilms(films), COUNT_EXTRA_FILMS, `comments.length`);

const content = templateCustomFilms(strDefaultFilms);
const topRatedFilms = strTopRatedFilms && templateCustomExtraFilms(`Top rated`, strTopRatedFilms);
const mostCommentedFilms = strMostCommentedFilms && templateCustomExtraFilms(`Most commented`, strMostCommentedFilms);


render(headerPage, templateCustomRank());
render(mainPage, templateCustomMenu(films));
render(mainPage, templateCustomSort());
render(mainPage, content);

const filmsWrap = mainPage.querySelector(`.films`);
const filmsLists = filmsWrap.querySelector(`.films-list`);

render(filmsLists, templateCustomLoadMoreBtn());

const loadMoreBtn = document.querySelector(`.films-list__show-more`);

loadMoreBtn.addEventListener(`click`, (evt) => {
  const container = evt.target.parentElement.querySelector(`.films-list__container`);
  const prevCountFilm = countFilms;
  countFilms += COUNT_SHOW_FILM_BY_BTN;

  const piece = films.slice(prevCountFilm, countFilms);

  if (piece.length < COUNT_SHOW_FILM_BY_BTN) {
    loadMoreBtn.remove();
  }

  render(container, createSomeCards(templateCustomCard, piece, piece.length));
});

render(filmsWrap, topRatedFilms);
render(filmsWrap, mostCommentedFilms);
render(bodyPage, templateCustomDetailPopup(films[0], generateCollectionComments));
