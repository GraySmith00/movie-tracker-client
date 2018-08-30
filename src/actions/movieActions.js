export const addNowPlaying = movies => ({
  type: 'ADD_NOW_PLAYING',
  movies
});

export const updateFavorites = favorites => ({
  type: 'UPDATE_FAVORITES',
  favorites
});
