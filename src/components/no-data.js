import {AbstractComponent} from "./abstract-component.js";

const templateNoData = () => {
  return (
    `<section class="films">
      <section class="films-list">
        <h2 class="films-list__title">There are no movies in our database</h2>
      </section>
    </section>`
  );
};

export class NoData extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return templateNoData();
  }
}
