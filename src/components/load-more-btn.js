import {AbstractComponent} from "./abstract-component.js";

const templateCustomLoadMoreBtn = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export class LoadMoreBtn extends AbstractComponent {
  _addEventShowMore(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  getTemplate() {
    return templateCustomLoadMoreBtn();
  }
}
