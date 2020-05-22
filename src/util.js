import {MONTHS} from "./const.js";

const getRandomNumber = (min, max, param) => {
  if (param) {
    return (min + Math.random() * (max - min)).toFixed(1);
  }

  return min + Math.floor(Math.random() * (max - min));
};

const createRandomCollection = (collection, min, max) => {
  const maxText = getRandomNumber(min, max);
  const uniqueValue = new Set();

  for (let i = 0; i < maxText; i++) {
    uniqueValue.add(collection[Math.floor(Math.random() * collection.length)] + ` `);
  }

  return Array.from(uniqueValue);
};

const createSomeCards = (Card, current) => {
  const count = current.length;
  let fragment = document.createDocumentFragment();

  for (let j = 0; j < count; j++) {
    fragment.appendChild(new Card(current[j]).getElement());
  }

  return fragment;
};

const filterRatedFilms = (data) => {
  const clone = Object.assign([], data);

  const findValidData = data.some((item) => {
    return item.film_info.total_rating;
  });

  if (!findValidData) {
    return ``;
  }

  return findValidData && clone.sort((a, b) => {
    return Number(b.film_info.total_rating) - Number(a.film_info.total_rating);
  });
};

const filterMostCommentedFilms = (data) => {
  const clone = Object.assign([], data);

  const findValidData = data.some((item) => {
    return item.comments.length;
  });

  if (!findValidData) {
    return ``;
  }

  return clone.sort((a, b) => {
    return Number(b.comments.length) - Number(a.comments.length);
  });
};

const generateDate = () => {
  const now = new Date();
  const someDate = getRandomNumber(0, -1000);

  now.setDate(now.getDate() + someDate);

  return now.toISOString();
};

const retrieveDate = (str) => {
  let ms = Date.parse(str);
  let date = new Date(ms);

  return {
    year: date.getFullYear(),
    month: MONTHS[date.getMonth()],
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
  };
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
  getRandomNumber,
  createSomeCards,
  createRandomCollection,
  generateDate, retrieveDate,
  filterRatedFilms,
  filterMostCommentedFilms,
  createElement,
  render
};
