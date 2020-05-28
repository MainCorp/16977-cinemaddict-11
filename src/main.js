import {COUNT_FILMS} from "./const.js";

import {HeaderController} from "./controllers/header.js";
import {PageController} from "./controllers/page.js";
import {FooterController} from "./controllers/footer.js";

import {generateFilmList} from "./mock/films.js";

const cards = generateFilmList(COUNT_FILMS);

const bodyPage = document.querySelector(`body`);
const headerPage = bodyPage.querySelector(`.header`);
const mainPage = bodyPage.querySelector(`.main`);
const footerPage = document.querySelector(`.footer`);

const header = new HeaderController(headerPage);
header.render();

const main = new PageController(mainPage);
main.render(cards);

const footer = new FooterController(footerPage);
footer.render(cards);
