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
    this._sortElement = null;
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

    this._sortElement = document.querySelector(`a[data-sort-type="${this._currentType}"]`);

    container.addEventListener(`click`, (evt) => {
      evt.preventDefault();

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
      handler(this._currentType);
    });
  }
}
