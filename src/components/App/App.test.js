import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { mockNowPlayingFetch } from '../../mockData/mockFetches';
import { mockStore } from '../../mockData/mockStore';

describe('App', () => {
  let wrapper;

  beforeEach(async () => {
    const mockAddNowPlaying = jest.fn();
    const mockSetCurrentUser = jest.fn();
    const mockClearFavorites = jest.fn();
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
});
