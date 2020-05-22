import {createElement} from "../util.js";

const templateCustomExtraFilms = (title) => {
  return (
    `<section class="films-list--extra">
      <h2 class="films-list__title">${title}</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export class ExtraFilmsBoard {
  constructor(title) {
    this._title = title;
    this._element = null;
  }

  getTemplate() {
    return templateCustomExtraFilms(this._title);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._title));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
