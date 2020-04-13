export const createSomeCards = (item, count) => {
  let cards = ``;

  for (let i = 0; i < count; i++) {
    cards += item;
  }

  return cards;
};
