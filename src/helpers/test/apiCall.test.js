import React from 'react';
import { shallow } from 'enzyme';
import { getNowPlaying, registerUser, findUser } from '../apiCalls';
import { key } from '../../api-key';
import { mockNowPlayingFetch } from '../../mockData/mockFetches';
import { mockStore } from '../../mockData/mockStore';

describe('apiCall component', () => {
  let wrapper;
  let mockUser;
  let mockUserResponse;

  beforeEach(() => {
    mockUser = {
      name: 'paul',
      email: 'paul@paul.com',
      password: 'paulrulez'
    };
    mockUserResponse = {
      id: 17,
      name: 'paul',
      email: 'paul@paul.com',
      password: 'paulrulez'
    };

    wrapper = shallow(<apiCall />);
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

    it('should return user object', () => {
      registerUser(mockUser);
    });
  });
});
