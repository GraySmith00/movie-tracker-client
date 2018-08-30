const initialState = {
  nowPlaying: [],
  favorites: []
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOW_PLAYING":
      return {
        ...state,
        nowPlaying: action.movies
      };
    case "ADD_FAVORITES":
      return {
        ...state,
        favorites: action.favorites
      };

    default:
      return state;
  }
};
