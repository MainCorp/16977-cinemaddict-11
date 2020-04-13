import {createSomeCards} from "./components/utils.js";

import {templateCustomRank} from "./components/rank.js";
import {templateCustomMenu} from "./components/menu.js";
import {templateCustomSort} from "./components/sort.js";
import {templateCustomCard} from "./components/card.js";
import {templateCustomLoadMoreBtn} from "./components/load-more-btn.js";
import {templateCustomCardTopRated} from "./components/card-top-rated.js";
import {templateCustomCardMostCommented} from "./components/card-most-commented.js";
import {templateCustomDetailPopup} from "./components/detail-popup.js";
import {templateCustomFilms} from "./components/films.js";
import {templateCustomExtraFilms} from "./components/extra-films.js";

const COUNT_FILMS = 5;
const COUNT_EXTRA_FILMS = 2;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const bodyPage = document.querySelector(`body`);
const headerPage = bodyPage.querySelector(`.header`);
const mainPage = bodyPage.querySelector(`.main`);

const rank = templateCustomRank();
const menu = templateCustomMenu();
const sort = templateCustomSort();
const card = templateCustomCard();
const loadMoreBtn = templateCustomLoadMoreBtn();
const cardTopRated = templateCustomCardTopRated();
const cardMostCommented = templateCustomCardMostCommented();
const detailPopup = templateCustomDetailPopup();
const content = templateCustomFilms(createSomeCards(card, COUNT_FILMS));
const topRatedFilms = templateCustomExtraFilms(`Top rated`, createSomeCards(cardTopRated, COUNT_EXTRA_FILMS));
const mostCommentedFilms = templateCustomExtraFilms(`Most commented`, createSomeCards(cardMostCommented, COUNT_EXTRA_FILMS));


render(headerPage, rank);
render(mainPage, menu);
render(mainPage, sort);
render(mainPage, content);

const filmsWrap = mainPage.querySelector(`.films`);
const filmsLists = filmsWrap.querySelector(`.films-list`);

render(filmsLists, loadMoreBtn);
render(filmsWrap, topRatedFilms);
render(filmsWrap, mostCommentedFilms);
render(bodyPage, detailPopup);
