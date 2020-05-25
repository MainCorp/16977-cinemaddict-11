import {createElement} from "../util.js";

const templateCustomFooterStatistics = (data) => {
  const statistics = `<p>` + data.length + ` movies inside</p>`;

  return (
    `<section class="footer__statistics">
       ${statistics}
     </section>`
  );
};

export class Statistics {
  constructor(data) {
    this._data = data;
    this._element = null;
  }

  getTemplate() {
    return templateCustomFooterStatistics(this._data);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }
}
