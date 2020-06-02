import {AbstractComponent} from "./abstract-component";

export class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(`Abstract method not implemented: recoveryListeners`);
  }

  rerender(container, oldElement, newElement) {
    if (!oldElement) {
      container.appendChild(newElement);

      this.recoveryListeners();
      return;
    }

    oldElement = container.firstChild;

    container.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
