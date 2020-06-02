
import moment from "moment";

import {AbstractSmartComponent} from "./abstract-smart-component.js";
import {render} from "../utils/render.js";
import {Comment} from "./comments.js";
import {Emoji} from "./emoji.js";

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
  const runtime = moment.utc(moment.duration(data.film_info.runtime, `minutes`).as(`milliseconds`)).format(`H[h] mm[m]`);

  const genre = data.film_info.genre.join(`, `);
  const poster = data.film_info.poster;
  const description = data.film_info.description;
  const director = data.film_info.director;
  const writers = data.film_info.writers.join(`, `);
  const actors = data.film_info.actors.join(`, `);
  const country = data.film_info.release.release_country;

  const date = moment(data.film_info.release.date).format(`DD MMMM YYYY`);

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
                  <td class="film-details__cell">${date}</td>
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
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export class DetailPopup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._oldEmoji = null;
    this._containerEmoji = null;
    this._currentEmoji = null;
  }

  _createEmoji(button) {
    const emojiElement = document.createElement(`img`);
    emojiElement.src = `images/emoji/${button.value}.png`;
    emojiElement.width = 55;
    emojiElement.height = 55;
    emojiElement.alt = button.id;

    return emojiElement;
  }

  _handlerRenderEmoji(evt) {
    evt.preventDefault();

    const button = evt.target;

    this._currentEmoji = button.value;
    this.rerender(this._containerEmoji, this._oldEmoji, this._createEmoji(button));
    this._oldEmoji = this._createEmoji(button);
  }

  _subscribeOnEvents() {
    const collectionEmoji = this._element.querySelectorAll(`.film-details__emoji-item`);
    this._containerEmoji = this._element.querySelector(`.film-details__add-emoji-label`);

    this._handlerRenderEmoji = this._handlerRenderEmoji.bind(this);

    collectionEmoji.forEach((button) => {
      button.addEventListener(`click`, this._handlerRenderEmoji);
    });
  }

  addEmojiButtons(emojiButtons) {
    if (emojiButtons === undefined) {
      return;
    }

    const container = this._element.querySelector(`.film-details__new-comment`);

    render(container, emojiButtons);
  }

  recoveryListeners() {
    const container = this._element.querySelector(`.film-details__emoji-list`);
    container.remove();

    const emoji = new Emoji();
    emoji.setCurrentElement(this._currentEmoji);

    const emojiButtons = emoji.getElement();

    this.addEmojiButtons(emojiButtons);

    this._subscribeOnEvents();
  }

  setWatchlistButtonClickHandler(handler) {
    this.getElement().querySelector(`#watchlist`).addEventListener(`change`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`#watched`).addEventListener(`change`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`#favorite`).addEventListener(`change`, handler);
  }

  getTemplate() {
    return templateCustomDetailPopup(this._card, new Comment(this._card.comments).generateCollectionComments());
  }

  getElement() {
    this._element = super.getElement();

    this.addEmojiButtons();

    return this._element;
  }
}
