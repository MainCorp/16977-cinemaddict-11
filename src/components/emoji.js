import {AbstractComponent} from "./abstract-component";

const templateCustomEmojiList = (checkedEmoji) => {
  return (
    `<div class="film-details__emoji-list">
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${checkedEmoji === `smile` ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-smile">
        <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
        </label>
    
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${checkedEmoji === `sleeping` ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-sleeping">
        <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
        </label>
    
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${checkedEmoji === `puke` ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-puke">
        <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
        </label>
    
        <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${checkedEmoji === `angry` ? `checked` : ``}>
        <label class="film-details__emoji-label" for="emoji-angry">
        <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
        </label>
    </div>`
  );
};

export class Emoji extends AbstractComponent {
  constructor() {
    super();
    this._checkedElement = null;
  }

  setCurrentElement(current) {
    this._checkedElement = current;
  }

  getTemplate() {
    return templateCustomEmojiList(this._checkedElement);
  }
}
