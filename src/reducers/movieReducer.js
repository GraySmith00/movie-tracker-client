const initialState = {
  nowPlaying: [],
  favorites: []
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOW_PLAYING':
      return {
        ...state,
        nowPlaying: action.movies
      };

    case 'UPDATE_FAVORITES':
      return {
        ...state,
        favorites: action.movieIds
      };

    default:
      return state;
  }
};
