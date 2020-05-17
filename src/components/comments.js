import {retrieveDate} from "../util.js";

const templateCustomComment = (data) => {
  const date = retrieveDate(data.date);
  const year = date.year;
  const month = date.month;
  const day = date.day;
  const hours = date.hours;
  const minutes = date.minutes;

  return (`
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${data.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${data.author}</span>
          <span class="film-details__comment-day">${year}/${month}/${day} ${hours}:${minutes}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
    `);
};

export {templateCustomComment};
