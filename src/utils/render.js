import {Card} from "../components/card.js";

const createSomeCards = (current) => {
  const count = current.length;
  let fragment = document.createDocumentFragment();

  for (let j = 0; j < count; j++) {
    fragment.appendChild(new Card(current[j]).getElement());
  }

  return fragment;
};

const createElement = (tmp) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = tmp;

  return newElement.firstChild;
};

const render = (container, element) => {
  container.append(element);
};

export {
  createSomeCards,
  createElement,
  render
};
