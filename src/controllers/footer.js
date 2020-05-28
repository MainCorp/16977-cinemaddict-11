import {render} from "../utils/render.js";

import {Statistics} from "../components/statistics.js";

export class FooterController {
  constructor(container) {
    this._container = container;
    this._statistics = null;
  }

  render(cards) {
    this._statistics = new Statistics(cards).getElement();
    render(this._container, this._statistics);
  }
}
