import {MONTHS} from "../const.js";

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
  createRandomCollection,
  generateDate,
  retrieveDate
};
