import * as actions from '../movieActions';
import { mockStore } from '../../mockData/mockStore';

describe('all movie actions', () => {
  it('should return a type of ADD_NOW_PLAYING, with movies', () => {
    const movies = mockStore.movies.nowPlaying;
    const expected = {
      type: 'ADD_NOW_PLAYING',
      movies
    };
    expect(actions.addNowPlaying(movies)).toEqual(expected);
  });

  it('should return a type of TOGGLE_MOVIE_STATUS, with changedMovie', () => {
    const changedMovie = mockStore.movies.nowPlaying[0];
    const expected = {
      type: 'TOGGLE_MOVIE_STATUS',
      changedMovie
    };
    expect(actions.toggleMovieStatus(changedMovie)).toEqual(expected);
  });

  it('should return a type of ADD_FAVORITE_TO_STATE with movieId', () => {
    const movieId = mockStore.movies.favorites[0];
    const expected = {
      type: 'ADD_FAVORITE_TO_STATE',
      movieId
    };
    expect(actions.addFavoriteToState(movieId)).toEqual(expected);
  });

  it('should return a type of REMOVE_FAVORITE_FROM_STATE with movieId', () => {
    const movieId = mockStore.movies.favorites[0];
    const expected = {
      type: 'REMOVE_FAVORITE_FROM_STATE',
      movieId
    };
    expect(actions.removeFavoriteFromState(movieId)).toEqual(expected);
  });

  it('should return a type of POPULATE_FAVORITES_STATE with movieIds', () => {
    const movieIds = mockStore.movies.favorites;
    const expected = {
      type: 'POPULATE_FAVORITES_STATE',
      movieIds
    };
    expect(actions.populateFavoritesState(movieIds)).toEqual(expected);
  });

  it('should return a type of CLEAR_FAVORITES', () => {
    const expected = {
      type: 'CLEAR_FAVORITES'
    };
    expect(actions.clearFavorites()).toEqual(expected);
  });
});
