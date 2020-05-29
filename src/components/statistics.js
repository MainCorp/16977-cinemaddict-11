import {AbstractComponent} from "./abstract-component.js";

const templateCustomFooterStatistics = (data) => {
  const statistics = `<p>` + data.length + ` movies inside</p>`;

  return (
    `<section class="footer__statistics">
       ${statistics}
     </section>`
  );
};

export class Statistics extends AbstractComponent {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return templateCustomFooterStatistics(this._data);
  }
}
