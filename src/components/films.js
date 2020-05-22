import {createElement} from "../util.js";

const templateCustomFilms = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

        <div class="films-list__container">
        </div>
      </section>
    </section>`
  );
};

export class FilmsBoard {
  constructor(films) {
    this._films = films;
    this._element = null;
  }

  getTemplate() {
    return templateCustomFilms(this._films);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._films));
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
