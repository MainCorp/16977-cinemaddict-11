import {AbstractComponent} from "./abstract-component.js";
import {SORT_TYPE} from "../const.js";

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
  getTemplate() {
    return templateCustomSort(this._currentType);
  }

  setSortChangeHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}
