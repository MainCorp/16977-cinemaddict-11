const filterRatedFilms = (data) => {
  const clone = Object.assign([], data);

  const findValidData = data.some((item) => {
    return item.film_info.total_rating;
  });

  if (!findValidData) {
    return ``;
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
    return ``;
  }

  return clone.sort((a, b) => {
    return Number(b.comments.length) - Number(a.comments.length);
  });
};

export {
  filterRatedFilms,
  filterMostCommentedFilms
};
