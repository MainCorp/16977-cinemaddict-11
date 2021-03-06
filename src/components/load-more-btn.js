import {createElement} from "../util.js";

const templateCustomLoadMoreBtn = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export class LoadMoreBtn {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return templateCustomLoadMoreBtn();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
