import {render} from "../utils/render.js";

import {Rank} from "../components/rank.js";

export class HeaderController {
  constructor(container) {
    this._container = container;
    this._rank = new Rank();
  }

  render() {
    render(this._container, this._rank.getElement());
  }
}
