import {retrieveDate} from "../util.js";

const generateGenres = (str) => {
  const genres = str.split(`,`);

  return genres.map((item) => {
    return `<span class="film-details__genre">${item.trim()}</span>`;
  }).join(`,`);
};

const generateComments = (items) => {
  const comments = items;

  comments.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  return comments.map((item) => {
    const date = retrieveDate(item.date);
    const year = date.year;
    const month = date.month;
    const day = date.day;
    const hours = date.hours;
    const minutes = date.minutes;

    return (`
      <li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${item.emotion}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${item.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${item.author}</span>
            <span class="film-details__comment-day">${year}/${month}/${day} ${hours}:${minutes}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>
      `);
  }).join(``);
};

export const templateCustomDetailPopup = (data) => {
  const comments = data.comments;
  const countComments = data.comments.length;

  const title = data.film_info.title;
  const alternativeTitle = data.film_info.alternative_title;
  const rating = data.film_info.total_rating;
  const ageRating = data.film_info.age_rating;
  const runtime = data.film_info.runtime;
  const genre = data.film_info.genre;
  const poster = data.film_info.poster;
  const description = data.film_info.description;
  const director = data.film_info.director;
  const writers = data.film_info.writers;
  const actors = data.film_info.actors;
  const country = data.film_info.release.release_country;

  const date = retrieveDate(data.film_info.release.date);
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const isAlreadyWatched = data.user_details.already_watched ? `checked` : ``;
  const isWatchlist = data.user_details.watchlist ? `checked` : ``;
  const isFavorite = data.user_details.favorite ? `checked` : ``;

  return (`
    <section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${day} ${month} ${year}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${runtime}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${generateGenres(genre)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isAlreadyWatched}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${countComments}</span></h3>

            <ul class="film-details__comments-list">
              ${generateComments(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>
  `);
};
