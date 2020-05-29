import {AbstractComponent} from "./abstract-component.js";

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

export class FilmsBoard extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return templateCustomFilms(this._cards);
  }
}
