import {MAX_COUNT_REVIEWS} from "../const.js";
import {getRandomNumber, createRandomCollection, generateDate, createArrayFromText} from "../util.js";

const producerName = [
  `Michael Badalucco`,
  `Clarence G. Badger`,
  `Frédéric Back`,
  `Richard Bakalyan`,
  `Ralph Bakshi`,
];

const writersList = [
  `Paul Savage`,
  `Richard Side`,
  `David Seidler`,
  `David Simon`,
  `Neil Simon`,
];

const actorsList = [
  `Alan Rickman`,
  `Benedict Cumberbatch`,
  `Benicio del Toro`,
  `Vincent Cassel`,
  `Viggo Mortensen`,
];

const ageRatingList = [
  `0+`,
  `6+`,
  `12+`,
  `14+`,
  `18+`,
];

const genreList = [
  `Time Travel`,
  `Academic paper`,
  `Science fiction`,
  `Post-apocalyptic`,
  `Technical writing`,
];

const countryList = [
  `Russia`,
  `Estonia`,
  `Finland`,
  `Iceland`,
  `Ireland`,
];

const authoList = [
  `Ivan`,
  `Alex`,
  `Jon`,
  `Amelia`,
  `Kira`,
];

const emotionList = [
  `smile`,
  `sleeping`,
  `puke`,
  `angry`,
];

const filmNames = [
  `The Dance of Life`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Harland & Wolff`, `White Star Line`,
  `Titanic`,
];

const filmPosters = [
  `/images/posters/made-for-each-other.png`,
  `/images/posters/popeye-meets-sinbad.png`,
  `/images/posters/sagebrush-trail.jpg`,
  `/images/posters/santa-claus-conquers-the-martians.jpg`,
  `/images/posters/the-dance-of-life.jpg`,
  `/images/posters/the-great-flamarion.jpg`,
  `/images/posters/the-man-with-the-golden-arm.jpg`,
];

const filmDescriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const filmSentence = filmDescriptionText.split(`. `).map((text) => {
  const reg = /\.$/;

  if (!reg.test(text)) {
    text += `.`;
  }

  return text.trim();
});

const generateReview = () => {
  return {
    author: authoList[Math.floor(Math.random() * authoList.length)],
    comment: filmSentence[Math.floor(Math.random() * filmSentence.length)],
    date: generateDate(),
    emotion: emotionList[Math.floor(Math.random() * emotionList.length)],
  };
};

const generateReviews = (count) => {
  const randomCountReview = getRandomNumber(0, count);

  return new Array(randomCountReview).fill(``).map(generateReview);
};

const createRuntime = (num) => {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;

  return hours > 0 ? hours + `h ` + minutes + `m` : minutes + `m`;
};

const generateFilm = () => {
  const title = filmNames[Math.floor(Math.random() * filmNames.length)];
  const comments = generateReviews(MAX_COUNT_REVIEWS);
  const runtime = createRuntime(getRandomNumber(20, 240));
  const writers = createArrayFromText(createRandomCollection(writersList, 1, writersList.length, `,`));
  const actors = createArrayFromText(createRandomCollection(actorsList, 1, actorsList.length, `,`));
  const genre = createArrayFromText(createRandomCollection(genreList, 1, genreList.length, `,`));


  return {
    comments,

    "film_info": {
      "title": title,
      "alternative_title": title,
      "total_rating": getRandomNumber(0, 10, true),
      "poster": filmPosters[Math.floor(Math.random() * filmPosters.length)],
      "age_rating": ageRatingList[Math.floor(Math.random() * ageRatingList.length)],
      "director": producerName[Math.floor(Math.random() * producerName.length)],
      writers,
      actors,
      "release": {
        "date": generateDate(),
        "release_country": countryList[Math.floor(Math.random() * countryList.length)],
      },
      "runtime": runtime,
      genre,
      "description": createRandomCollection(filmSentence, 1, 5),
    },

    "user_details": {
      "watchlist": Math.random() > 0.5,
      "already_watched": Math.random() > 0.5,
      "watching_date": generateDate(),
      "favorite": Math.random() > 0.5,
    },
  };
};

const generateFilmList = (count) => {
  return new Array(count).fill(``).map(generateFilm);
};

export {generateFilmList};
