import {AbstractComponent} from "./abstract-component.js";

const templateCustomFooterStatistics = (data) => {
  return (
    `<section class="footer__statistics">
       <p>${data.length} movies inside</p>
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
