import * as actions from '../../actions/movieActions';
import { movieReducer } from '../movieReducer';
import { mockStore } from '../../mockData/mockStore';

describe('movieReducer', () => {
  let mockMovie;
  let mockFavoritedMovie;
  let favoriteMovieIds;
  let nowPlayingMovies;

  beforeEach(() => {
    mockMovie = {
      movie_id: 345940,
      title: 'The Meg',
      release_date: '2018-08-09',
      overview:
        'A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.',
      vote_average: 6.2,
      poster_path:
        'http://image.tmdb.org/t/p/original/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg',
      trailer: 'https://www.youtube.com/embed/wb49-oV0F78',
      favorite: false
    };

    mockFavoritedMovie = {
      movie_id: 345940,
      title: 'The Meg',
      release_date: '2018-08-09',
      overview:
        'A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.',
      vote_average: 6.2,
      poster_path:
        'http://image.tmdb.org/t/p/original/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg',
      trailer: 'https://www.youtube.com/embed/wb49-oV0F78',
      favorite: true
    };

    nowPlayingMovies = mockStore.movies.nowPlaying;

    favoriteMovieIds = mockStore.movies.favorites;
  });
  it('should return initial state on default', () => {
    const expected = {
      nowPlaying: [],
      favorites: []
    };
    expect(movieReducer(undefined, {})).toEqual(expected);
  });

  it('should return the proper state when nowPlaying movies are added', () => {
    const expected = { favorites: [], nowPlaying: nowPlayingMovies };
    const result = movieReducer(
      undefined,
      actions.addNowPlaying(nowPlayingMovies)
    );
    expect(result).toEqual(expected);
  });

  it('should not change the movie favorite status for movies that are unchanged', () => {
    const mockMovieTwo = {
      movie_id: 353081,
      title: 'Mission: Impossible - Fallout',
      release_date: '2018-07-25',
      overview:
        'When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfil his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.',
      vote_average: 7.3,
      poster_path:
        'http://image.tmdb.org/t/p/original/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg',
      trailer: 'https://www.youtube.com/embed/wb49-oV0F78',
      favorite: false
    };

    const currentState = {
      favorites: [],
      nowPlaying: [mockMovieTwo]
    };
    const expected = { favorites: [], nowPlaying: [mockMovieTwo] };

    const result = movieReducer(
      currentState,
      actions.toggleMovieStatus(mockMovie)
    );

    expect(result).toEqual(expected);
  });

  it('should return proper state when movies favorite status changes from false to true', () => {
    const currentState = { favorites: [], nowPlaying: [mockMovie] };
    const expected = { favorites: [], nowPlaying: [mockFavoritedMovie] };

    const result = movieReducer(
      currentState,
      actions.toggleMovieStatus(mockMovie)
    );

    expect(result).toEqual(expected);
  });

  it('should return proper state when movies favorite status changes from true to false', () => {
    const currentState = { favorites: [], nowPlaying: [mockFavoritedMovie] };
    const expected = { favorites: [], nowPlaying: [mockMovie] };

    const result = movieReducer(
      currentState,
      actions.toggleMovieStatus(mockFavoritedMovie)
    );

    expect(result).toEqual(expected);
  });

  it('should return proper state when a new favorite movie is added', () => {
    const currentState = { favorites: [], nowPlaying: [mockMovie] };

    const expected = { favorites: [345940], nowPlaying: [mockMovie] };

    const result = movieReducer(
      currentState,
      actions.addFavoriteToState(mockMovie.movie_id)
    );

    expect(result).toEqual(expected);
  });

  it('should return proper state when a favorite movie is removed', () => {
    const currentState = { favorites: [345940], nowPlaying: [mockMovie] };

    const expected = { favorites: [], nowPlaying: [mockMovie] };

    const result = movieReducer(
      currentState,
      actions.removeFavoriteFromState(mockMovie.movie_id)
    );

    expect(result).toEqual(expected);
  });

  it('should populate favorites state on user login', () => {
    const currentState = {
      favorites: [],
      nowPlaying: mockStore.movies.nowPlaying
    };
    const newNowPlaying = mockStore.movies.nowPlaying.map(movie => {
      return favoriteMovieIds.includes(movie.movie_id)
        ? { ...movie, favorite: true }
        : movie;
    });
    const expected = {
      favorites: favoriteMovieIds,
      nowPlaying: newNowPlaying
    };

    const result = movieReducer(
      currentState,
      actions.populateFavoritesState(favoriteMovieIds)
    );

    expect(result).toEqual(expected);
  });

  it('should set favorites to an empty array on user logout', () => {
    const currentState = {
      favorites: favoriteMovieIds,
      nowPlaying: nowPlayingMovies
    };
    const expected = {
      favorites: [],
      nowPlaying: nowPlayingMovies
    };

    const result = movieReducer(currentState, actions.clearFavorites());

    expect(result).toEqual(expected);
  });
});
