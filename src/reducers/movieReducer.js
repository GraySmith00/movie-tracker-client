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

    case 'TOGGLE_MOVIE_STATUS': {
      const nowPlaying = state.nowPlaying.map(
        movie =>
          movie.movie_id !== action.changedMovie.movie_id
            ? movie
            : {
                ...action.changedMovie,
                favorite: !action.changedMovie.favorite
              }
      );
      return {
        ...state,
        nowPlaying
      };
    }

    case 'ADD_FAVORITE_TO_STATE':
      return {
        ...state,
        favorites: [...state.favorites, action.movieId]
      };

    case 'REMOVE_FAVORITE_FROM_STATE': {
      const favorites = state.favorites.filter(
        favorite => favorite !== action.movieId
      );
      return {
        ...state,
        favorites
      };
    }

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
