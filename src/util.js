import {MONTHS} from "./const.js";

const getRandomNumber = (min, max, param) => {
  if (param) {
    return (min + Math.random() * (max - min)).toFixed(1);
  }

  return min + Math.floor(Math.random() * (max - min));
};

const createRandomCollection = (collection, min, max, param) => {
  const maxText = getRandomNumber(min, max);
  let sentences = ``;
  let delimiter = param;

  const uniqueValue = new Set();

  if (!delimiter) {
    delimiter = ` `;
  }

  for (let i = 0; i < maxText; i++) {
    uniqueValue.add(collection[Math.floor(Math.random() * collection.length)] + delimiter);
  }

  sentences = Array.from(uniqueValue).join(``);

  if (delimiter === param) {
    sentences = sentences.substring(0, sentences.length - delimiter.length);
  }

  return sentences;
};

const createSomeCards = (tmp, current, count, path) => {
  const keys = String(path).split(`.`);

  let cards = ``;
  let isValidData;

  if (path) {
    isValidData = current.filter((item) => {
      let currentElement = item;

      for (let i = 0; i < keys.length; i++) {
        currentElement = currentElement[keys[i]];
      }

      return !!Number(currentElement);
    });

    if (isValidData.length) {
      for (let i = 0; i < count; i++) {
        cards += tmp(isValidData[i]);
      }
    }

    return cards;
  }

  for (let j = 0; j < count; j++) {
    cards += tmp(current[j]);
  }

  return cards;
};

const filterRatedFilms = (data) => {
  const clone = Object.assign([], data);

  return clone.sort((a, b) => {
    return Number(b.film_info.total_rating) - Number(a.film_info.total_rating);
  });
};

const filterMostCommentedFilms = (data) => {
  const clone = Object.assign([], data);

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

export {
  getRandomNumber,
  createSomeCards,
  createRandomCollection,
  generateDate, retrieveDate,
  filterRatedFilms,
  filterMostCommentedFilms
};
