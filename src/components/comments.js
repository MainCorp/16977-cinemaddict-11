import {AbstractComponent} from "./abstract-component.js";

import moment from "moment";

const templateCustomComment = (data) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${data.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${data.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${data.author}</span>
          <span class="film-details__comment-day">${moment(data.date).fromNow()}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  generateCollectionComments() {
    this._comment.sort((a, b) => {
      return Date.parse(b.date) - Date.parse(a.date);
    });

    return this._comment.reduce((acc, item) => {
      return acc + this.getTemplate(item);
    }, ``);
  }

  getTemplate(comments) {
    return templateCustomComment(comments);
  }
}
