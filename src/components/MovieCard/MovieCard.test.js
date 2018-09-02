import React from 'react';
import { shallow } from 'enzyme';
import { MovieCard } from './MovieCard';
import { mockStore } from '../../mockData/mockStore';
import { mockMovie } from '../../mockData/mockData';

describe('MovieCard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <MovieCard movie={mockMovie} currentUser={mockStore.currentUser} />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleFavoriteClick', () => {
    let mockGetFavorites;
    let mockRemoveFavorite;
    let mockRemoveFavoriteFromState;
    let mockToggleMovieStatus;
    let mockAddFavorite;
    let mockAddFavoriteToState;
    beforeEach(() => {
      mockGetFavorites = jest.fn();
      mockRemoveFavorite = jest.fn();
      mockToggleMovieStatus = jest.fn();
      mockRemoveFavoriteFromState = jest.fn();
      mockAddFavorite = jest.fn();
      mockToggleMovieStatus = jest.fn();
      mockAddFavoriteToState = jest.fn();
      mockGetFavorites = jest.fn();

      wrapper = shallow(
        <MovieCard
          movie={mockMovie}
          currentUser={mockStore.currentUser}
          getFavorites={mockGetFavorites}
          removeFavorite={mockRemoveFavorite}
          toggleMovieStatus={mockToggleMovieStatus}
          removeFavoriteFromState={mockRemoveFavoriteFromState}
          addFavorite={mockAddFavorite}
          addFavoriteToState={mockAddFavoriteToState}
        />
      );
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockGetFavorites)
        })
      );
    });
    it('should display an alert if no currentUser', () => {});

    it('should invoke getFavorites if currentUser exists', async () => {
      //setup
      const expected = mockStore.currentUser;

      //execution
      await wrapper.instance().handleFavoriteClick();

      //expection

      // const result = await getFavorites
      expect(mockGetFavorites).toHaveBeenCalledWith(mockStore.currentUser);
    });
  });
});
