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

  if (!delimiter) {
    delimiter = ` `;
  }

  for (let i = 0; i < maxText; i++) {
    sentences += collection[Math.floor(Math.random() * collection.length)] + delimiter;
  }

  if (delimiter === param) {
    sentences = sentences.substring(0, sentences.length - 2);
  }

  return sentences;
};

const createSomeCards = (tmp, count, current) => {
  let cards = ``;

  for (let i = 0; i < current; i++) {
    cards += tmp(count[i]);
  }

  return cards;
};

const filterRatedFilms = (data) => {
  const clone = [];

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      clone[key] = data[key];
    }
  }

  return clone.sort((a, b) => {
    return Number(b.film_info.total_rating) - Number(a.film_info.total_rating);
  });
};

const filterMostCommentedFilms = (data) => {
  const clone = [];

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      clone[key] = data[key];
    }
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

export {getRandomNumber, createSomeCards, createRandomCollection, generateDate, retrieveDate, filterRatedFilms, filterMostCommentedFilms};
