export const addNowPlaying = movies => ({
  type: 'ADD_NOW_PLAYING',
  movies
});

export const toggleMovieStatus = changedMovie => ({
  type: 'TOGGLE_MOVIE_STATUS',
  changedMovie
});

export const addFavoriteToState = movieId => ({
  type: 'ADD_FAVORITE_TO_STATE',
  movieId
});

export const removeFavoriteFromState = movieId => ({
  type: 'REMOVE_FAVORITE_FROM_STATE',
  movieId
});

export const populateFavoritesState = movieIds => ({
  type: 'POPULATE_FAVORITES_STATE',
  movieIds
});

export const clearFavorites = () => ({
  type: 'CLEAR_FAVORITES'
});
