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

    case 'ADD_FAVORITE_TO_STATE':
      return {
        ...state,
        favorites: [...state.favorites, action.movieId]
      };

    case 'REMOVE_FAVORITE_FROM_STATE':
      return {
        ...state,
        favorites: state.favorites.filter(
          favorite => favorite !== action.movieId
        )
      };

    case 'POPULATE_FAVORITES_STATE':
      return {
        ...state,
        favorites: action.movieIds
      };

    case 'CLEAR_FAVORITES':
      return {
        ...state,
        favorites: []
      };

    default:
      return state;
  }
};
