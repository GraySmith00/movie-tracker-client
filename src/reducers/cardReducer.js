export const cardReducer = (state = [], action) => {
  switch (action.type) {
    case "TOGGLE_CARD":
      return state.map(
        card => (card.id === action.id ? favorite : !card.favorite)
      );
    default:
      return state;
  }
};
