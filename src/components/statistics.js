import {AbstractComponent} from "./abstract-component.js";

const templateCustomFooterStatistics = (data) => {
  const statistics = data.length;

  return (
    `<section class="footer__statistics">
       <p>${statistics} movies inside</p>
     </section>`
  );
};

export class Statistics extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return templateCustomFooterStatistics(this._cards);
  }
}
