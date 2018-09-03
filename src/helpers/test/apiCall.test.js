import {
  getNowPlaying,
  registerUser,
  findUser,
  loginUser,
  addFavorite,
  getFavorites,
  removeFavorite
} from '../apiCalls';
import { key } from '../../api-key';
import { mockNowPlayingFetch, mockUserFetch } from '../../mockData/mockFetches';
import { mockStore } from '../../mockData/mockStore';

describe('apiCall component', () => {
  let mockMovie;
  let mockUser;

  beforeEach(() => {
    mockUser = {
      name: 'paul',
      email: 'paul@paul.com',
      password: 'paulrulez'
    };

    mockMovie = mockStore.movies.nowPlaying[0];

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockNowPlayingFetch)
      })
    );
  });

  describe('getNowPlaying', () => {
    it('should call fetch with correct params', () => {
      const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`;

      getNowPlaying();

      expect(window.fetch).toHaveBeenCalledWith(url);
    });

    it('should return an array of nowPlaying movies if the response is ok', async () => {
      const result = await getNowPlaying();
      expect(result).toEqual(mockStore.movies.nowPlaying);
    });

    it('should throw an error if the fetch fails', async () => {
      const expected = new Error('failed to fetch');
      window.fetch = jest.fn().mockImplementation(() => {
        return Promise.reject(new Error('failed to fetch'));
      });

      await expect(getNowPlaying()).rejects.toEqual(expected);
    });
  });
  describe('registerUser', () => {
    it('should call fetch with the correct params', () => {
      const expected = [
        'http://localhost:3000/api/users/new/',
        {
          method: 'POST',
          body: JSON.stringify(mockUser),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ];
      registerUser(mockUser);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should call findUser with correct params if response is ok', async () => {
      const result = await registerUser(mockUser);
      await expect(result).toEqual(undefined);
    });
  });

  describe('findUser', () => {
    it('should call fetch with the correct params', () => {
      const url = 'http://localhost:3000/api/users';

      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockUserFetch)
        })
      );

      findUser(mockUser.email);

      expect(window.fetch).toHaveBeenCalledWith(url);
    });
  });

  describe('loginUser', () => {
    let url;
    beforeEach(() => {
      url = 'http://localhost:3000/api/users';
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockUserFetch)
        })
      );
    });

    it('should call fetch with the correct params', () => {
      loginUser(mockUser.email, mockUser.password);

      expect(window.fetch).toHaveBeenCalledWith(url);
    });

    it('should return user object if response is ok', async () => {
      const mockUser = { id: 19, name: 'paul Kim', password: 'a', email: 'a' };

      const result = await loginUser(mockUser.email, mockUser.password);

      expect(result).toEqual(mockUser);
    });
  });

  describe('addFavorite', () => {
    it('should call addFavorite with the correct params', () => {
      const mockUser = { id: 19, name: 'paul Kim', password: 'a', email: 'a' };
      const mockFavoriteMovie = {
        movie_id: 345940,
        title: 'The Meg',
        release_date: '2018-08-09',
        overview:
          'A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.',
        poster_path:
          'http://image.tmdb.org/t/p/original/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg',
        vote_average: 6.2,
        user_id: 19
      };
      const expected = [
        'http://localhost:3000/api/users/favorites/new',
        {
          method: 'POST',
          body: JSON.stringify(mockFavoriteMovie),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ];

      addFavorite(mockMovie, mockUser);

      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });
  });

  describe('getFavorites', () => {
    it('should invoke fetch the with correct params', () => {
      const currentUser = mockStore.currentUser;
      const url = `/api/users/${currentUser.id}/favorites`;
      getFavorites(currentUser);
      expect(window.fetch).toHaveBeenCalledWith(url);
    });
    it('should return a favorites array', async () => {
      const currentUser = mockStore.currentUser;
      const mockUserFetch = {
        status: 'success',
        data: [
          {
            id: 50,
            movie_id: 353081,
            user_id: 13,
            title: 'Mission: Impossible - Fallout',
            poster_path:
              'http://image.tmdb.org/t/p/original/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg',
            release_date: '2018-07-25',
            vote_average: '7.3',
            overview:
              'When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfil his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.'
          }
        ],
        message: 'Retrieved All favorites'
      };
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockUserFetch)
        })
      );
      const result = await getFavorites(currentUser);
      expect(result).toEqual(mockUserFetch);
    });
  });

  describe('removeFavorites', () => {
    beforeEach(() => {
      const mockResponse = { status: 'success', message: '1 row was deleted.' };

      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResponse)
        })
      );
    });
    it('should invoke fetch with the correct params', () => {
      const currentUser = mockStore.currentUser;
      const movie = mockMovie;
      const url = `/api/users/${currentUser.id}/favorites/${movie.movie_id}`;
      const expected = [
        url,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ];
      removeFavorite(movie, currentUser);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should return movie id', async () => {
      const currentUser = mockStore.currentUser;
      const movie = mockMovie;
      const result = await removeFavorite(movie, currentUser);
      expect(result).toEqual(movie.movie_id);
    });
  });
});
