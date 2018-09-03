import React from 'react';
import { shallow } from 'enzyme';
import { App, mapDispatchToProps } from './App';
import { mockNowPlayingFetch } from '../../mockData/mockFetches';
import { mockStore } from '../../mockData/mockStore';
import { addNowPlaying, clearFavorites } from '../../actions/movieActions';

describe('App', () => {
  let wrapper;
  let mockAddNowPlaying;
  let mockSetCurrentUser;
  let mockClearFavorites;

  beforeEach(async () => {
    mockAddNowPlaying = jest.fn();
    mockSetCurrentUser = jest.fn();
    mockClearFavorites = jest.fn();
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockNowPlayingFetch)
      })
    );
    wrapper = await shallow(
      <App
        addNowPlaying={mockAddNowPlaying}
        setCurrentUser={mockSetCurrentUser}
        clearFavorites={mockClearFavorites}
        currentUser={mockStore.currentUser}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should make a fetch call on compoenent did mount', () => {
    expect(window.fetch).toHaveBeenCalled();
  });

  it.skip('should catch if an error', async () => {
    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('failed')));

    const error = new Error('failed');

    wrapper = shallow(
      <App
        addNowPlaying={mockAddNowPlaying}
        setCurrentUser={mockSetCurrentUser}
        clearFavorites={mockClearFavorites}
        currentUser={mockStore.currentUser}
      />
    );
    await expect(wrapper).rejects.toEqual(error);
  });

  describe('mapDispatchToProps', () => {
    let movies = [
      {
        movie_id: 345940,
        title: 'The Meg',
        release_date: '2018-08-09',
        overview:
          'A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.',
        vote_average: 6.2,
        poster_path:
          'http://image.tmdb.org/t/p/original/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg',
        favorite: false
      }
    ];
    it('should map the store correctly if addNowPlaying is dispatched', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.addNowPlaying(movies);
      expect(mockDispatch).toHaveBeenCalled();
    });
    it('should map the store correctly if setCurrentUser is dispatched', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.setCurrentUser(mockStore.currentUser);
      expect(mockDispatch).toHaveBeenCalled();
    });
    it('should map the store correctly if clearFavorites is dispatched', () => {
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.clearFavorites();
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
