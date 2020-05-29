import {AbstractComponent} from "./abstract-component.js";
import {retrieveDate} from "../utils/common.js";

const SORT_TYPE = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const templateCustomSort = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type="${SORT_TYPE.DEFAULT}" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" data-sort-type="${SORT_TYPE.DATE}" class="sort__button">Sort by date</a></li>
      <li><a href="#" data-sort-type="${SORT_TYPE.RATING}" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

export class Filter extends AbstractComponent {
  constructor() {
    super();
    this._currentType = SORT_TYPE.DEFAULT;
  }
  getTemplate() {
    return templateCustomSort(this._currentType);
  }

  getSortType() {
    return this._currentType;
  }

  getSortedCards(cards, type, start, end) {
    let sortedCards = [];
    const showingCards = cards.slice();

    switch (type) {
      case SORT_TYPE.DEFAULT:
        sortedCards = showingCards;
        break;
      case SORT_TYPE.DATE:
        sortedCards = showingCards.sort((a, b) => {
          return retrieveDate(b.film_info.release.date).year - retrieveDate(a.film_info.release.date).year;
        });
        break;
      case SORT_TYPE.RATING:
        sortedCards = showingCards.sort((a, b) => {
          return Number(b.film_info.total_rating) - Number(a.film_info.total_rating);
        });
        break;
    }

    return sortedCards.slice(start, end);
  }

  setSortChangeHandler(handler) {
    const container = this.getElement();

    container.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      const prevSortElement = container.querySelector(`a[data-sort-type="${this.getSortType()}"]`);

      const sortType = evt.target.dataset.sortType;

      if (!sortType || sortType === this._currentType) {
        return;
      }

      prevSortElement.classList.remove(`sort__button--active`);
      evt.target.classList.add(`sort__button--active`);

      this._currentType = sortType;
      handler(this._currentType);
    });
  }
}
