export const addNowPlaying = movies => ({
  type: 'ADD_NOW_PLAYING',
  movies
});

export const updateFavorites = movieIds => ({
  type: 'UPDATE_FAVORITES',
  movieIds
});
