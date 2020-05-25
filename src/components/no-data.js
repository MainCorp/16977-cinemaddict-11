import {createElement} from "../util.js";

const templateNoData = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`
  );
};

export class NoData {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return templateNoData();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
