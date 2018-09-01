import * as actions from '../../actions/movieActions';
import { movieReducer } from '../movieReducer';
import { mockStore } from '../../mockData/mockStore';

describe('movieReducer', () => {
  it('should return initial state on default', () => {
    const expected = {
      nowPlaying: [],
      favorites: []
    };
    expect(movieReducer(undefined, {})).toEqual(expected);
  });

  it('should return state with now playing movies', () => {
    const mockMovies = mockStore.movies.nowPlaying;
    const expected = { favorites: [], nowPlaying: mockMovies };
    expect(movieReducer(undefined, actions.addNowPlaying(mockMovies))).toEqual(
      expected
    );
  });

  it('should return state with movies status change', () => {
    const mockMovie = {
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

    const changedStatus = [
      {
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
      }
    ];
    const expected = { favorites: [], nowPlaying: changedStatus };
    expect(
      movieReducer(undefined, actions.toggleMovieStatus(mockMovie))
    ).toEqual(expected);
  });
});
