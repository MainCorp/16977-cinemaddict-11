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

const createSomeCards = (tmp, current) => {
  const count = current.length;
  let cards = ``;

  for (let j = 0; j < count; j++) {
    cards += tmp(current[j]);
  }

  return cards;
};

const filterRatedFilms = (data) => {
  const clone = Object.assign([], data);

  const findValidData = data.some((item) => {
    return item.film_info.total_rating;
  });

  if (!findValidData) {
    return clone;
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
    return clone;
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

const generateCollectionComments = (comments, tmp) => {
  return comments.map((item) => {
    return tmp(item);
  }).join(``);
};

export {
  getRandomNumber,
  createSomeCards,
  createRandomCollection,
  generateDate, retrieveDate,
  filterRatedFilms,
  filterMostCommentedFilms,
  generateCollectionComments
};
