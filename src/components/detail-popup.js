import {KEY_ESC} from "../const.js";
import {retrieveDate, createElement} from "../util.js";
import {Comment} from "./comments.js";

const generateGenres = (str) => {
  const genres = str.split(`,`);

  return genres.map((item) => {
    return `<span class="film-details__genre">${item.trim()}</span>`;
  }).join(`,`);
};

const templateCustomDetailPopup = (data, collectionComments) => {
  const comments = data.comments;
  const countComments = data.comments.length;

  const title = data.film_info.title;
  const alternativeTitle = data.film_info.alternative_title;
  const rating = data.film_info.total_rating;
  const ageRating = data.film_info.age_rating;
  const runtime = data.film_info.runtime;
  const genre = data.film_info.genre.join(`, `);
  const poster = data.film_info.poster;
  const description = data.film_info.description;
  const director = data.film_info.director;
  const writers = data.film_info.writers.join(`, `);
  const actors = data.film_info.actors.join(`, `);
  const country = data.film_info.release.release_country;

  const date = retrieveDate(data.film_info.release.date);
  const year = date.year;
  const month = date.month;
  const day = date.day;

  const isAlreadyWatched = data.user_details.already_watched ? `checked` : ``;
  const isWatchlist = data.user_details.watchlist ? `checked` : ``;
  const isFavorite = data.user_details.favorite ? `checked` : ``;

  comments.sort((a, b) => {
    return Date.parse(b.date) - Date.parse(a.date);
  });

  return (
    `<section class="film-details">
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
            ${collectionComments}
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
    </section>`
  );
};

export class DetailPopup {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  _handlerClickClosePopup() {
    this.closePopup();
  }

  _handlerKeyClosePopup(evt) {
    if (evt.keyCode === KEY_ESC) {
      this.closePopup();
    }
  }

  _addEventClosePopup() {
    const closePopupBtn = this._element.querySelector(`.film-details__close-btn`);

    this._handlerClickClosePopup = this._handlerClickClosePopup.bind(this);
    this._handlerKeyClosePopup = this._handlerKeyClosePopup.bind(this);

    closePopupBtn.addEventListener(`click`, this._handlerClickClosePopup);
    document.addEventListener(`keydown`, this._handlerKeyClosePopup);
  }

  closePopup() {
    const bodyPage = document.querySelector(`body`);

    bodyPage.removeChild(this._element);

    document.removeEventListener(`keydown`, this._handlerKeyClosePopup);
    this._element = null;
  }

  getTemplate() {
    return templateCustomDetailPopup(this._film, new Comment(this._film.comments).generateCollectionComments());
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate(this._film));

      this._addEventClosePopup();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
