import React from 'react';
import { shallow } from 'enzyme';
import { getNowPlaying } from '../apiCalls';
import { key } from '../../api-key';
import { mockNowPlayingFetch } from '../../mockData/mockFetches';
import { mockStore } from '../../mockData/mockStore';

describe('apiCall component', () => {
  let wrapper;

  beforeEach(() => {
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
});
