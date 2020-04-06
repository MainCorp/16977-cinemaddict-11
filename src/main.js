'use strict';

(() => {
  const COUNT_FILMS = 5;

  const templateCustomRank = () => {
    return (`
      <section class="header__profile profile">
        <p class="profile__rating">Movie Buff</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>
    `);
  };

  const templateCustomMenu = () => {
    return (`
      <nav class="main-navigation">
        <div class="main-navigation__items">
          <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
          <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
          <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
          <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
      </nav>
    `);
  };

  const templateCustomSort = () => {
    return (`
      <ul class="sort">
        <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
        <li><a href="#" class="sort__button">Sort by date</a></li>
        <li><a href="#" class="sort__button">Sort by rating</a></li>
      </ul>
    `);
  };

  const templateCustomCard = () => {
    return (`
      <article class="film-card">
        <h3 class="film-card__title">The Dance of Life</h3>
        <p class="film-card__rating">8.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1929</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
        </p>
        <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
        <a class="film-card__comments">5 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>
    `);
  };

  const templateCustomLoadMoreBtn = () => {
    return (`
      <button class="films-list__show-more">Show more</button>
    `);
  };

  const templateCustomCardTopRated = () => {
    return (`
      <article class="film-card">
        <h3 class="film-card__title">The Dance of Life</h3>
        <p class="film-card__rating">8.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1929</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">Musical</span>
        </p>
        <img src="./images/posters/the-dance-of-life.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Burlesque comic Ralph "Skid" Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…</p>
        <a class="film-card__comments">5 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>
    `);
  };

  const templateCustomCardMostCommented = () => {
    return (`
      <article class="film-card">
        <h3 class="film-card__title">The Man with the Golden Arm</h3>
        <p class="film-card__rating">9.0</p>
        <p class="film-card__info">
          <span class="film-card__year">1955</span>
          <span class="film-card__duration">1h 59m</span>
          <span class="film-card__genre">Drama</span>
        </p>
        <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
        <a class="film-card__comments">18 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
        </form>
      </article>
    `);
  };

  const templateCustomDetailPopup = () => {
    return (`
      <article class="film-card">
        <h3 class="film-card__title">Santa Claus Conquers the Martians</h3>
        <p class="film-card__rating">2.3</p>
        <p class="film-card__info">
          <span class="film-card__year">1964</span>
          <span class="film-card__duration">1h 21m</span>
          <span class="film-card__genre">Comedy</span>
        </p>
        <img src="./images/posters/santa-claus-conquers-the-martians.jpg" alt="" class="film-card__poster">
        <p class="film-card__description">The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…</p>
        <a class="film-card__comments">465 comments</a>
        <form class="film-card__controls">
          <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
          <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
          <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
        </form>
      </article>
    `);
  };

  const templateCustomFilms = () => {
    return (`
      <section class="films">
        <section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

          <div class="films-list__container">
          </div>
        </section>
      </section>
    `);
  };

  const templateCustomExtraFilms = (title, item, count) => {
    let cards = '';

    for (let i = 0; i < count; i++) {
      cards += item;
    }

    return (`
      <section class="films-list--extra">
        <h2 class="films-list__title">${title}</h2>

        <div class="films-list__container">
          ${cards}
        </div>
      </section>
    `);
  };

  const render = (container, template, how = `beforeend`) => {
    container.insertAdjacentHTML(how, template);
  };

  const headerOfPage = document.querySelector(`.header`);
  const mainOfPage = document.querySelector(`.main`);

  const rank = templateCustomRank();
  const menu = templateCustomMenu();
  const sort = templateCustomSort();
  const card = templateCustomCard();
  const loadMoreBtn = templateCustomLoadMoreBtn();
  const cardTopRated = templateCustomCardTopRated();
  const cardMostCommented = templateCustomCardMostCommented();
  const detailPopup = templateCustomDetailPopup();
  const content = templateCustomFilms();
  const topRatedFilms = templateCustomExtraFilms(`Top rated`, card, 2);
  const mostCommentedFilms = templateCustomExtraFilms(`Most commented`, card, 2);


  render(headerOfPage, rank);
  render(mainOfPage, menu, `afterbegin`);

  const mainNavigationContainer = mainOfPage.querySelector(`.main-navigation`);
  render(mainNavigationContainer, sort, `afterend`);

  const sortContainer = mainOfPage.querySelector(`.sort`);
  render(sortContainer, content, `afterend`);

  const filmsWrap = mainOfPage.querySelector(`.films`);
  const filmsLists = filmsWrap.querySelector(`.films-list`);
  const filmsCoontainer = filmsLists.querySelector(`.films-list__container`);

  for (let i = 0; i < COUNT_FILMS; i++) {
    render(filmsCoontainer, card);
  }

  render(filmsLists, loadMoreBtn);

  render(filmsWrap, topRatedFilms);

  render(filmsWrap, mostCommentedFilms);
})();
