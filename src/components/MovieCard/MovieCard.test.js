import React from 'react';
import { shallow } from 'enzyme';
import { MovieCard, mapStateToProps, mapDispatchToProps } from './MovieCard';
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
    });
    it('should display an alert if no currentUser', () => {});

    it('should invoke getFavorites if currentUser exists', async () => {
      const mockResult = {
        status: 'success',
        data: [],
        message: 'Retrieved All favorites'
      };

      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockResult)
        })
      );
      await wrapper.instance().handleFavoriteClick();
      expect(window.fetch).toHaveBeenCalled();
    });
  });
  describe('handleAlreadyFavorite', () => {
    it('should remove favorite if favorite already favorited', async () => {
      const mockRetrievedFavorite = {
        status: 'success',
        data: [
          {
            id: 41,
            movie_id: 353081,
            user_id: 2,
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

      const mockDeleteFavorite = {
        status: 'success',
        message: '1 row was deleted.'
      };
      window.fetch = jest.fn().mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve(mockDeleteFavorite)
        })
      );
      await wrapper
        .instance()
        .handleAlreadyFavorite(mockRetrievedFavorite.data[0]);
      expect(window.fetch).toHaveBeenCalled();
    });
  });
  describe('mapDispatchToProps', () => {
    it('should map the store correctly if addFavoriteTostate is dispatched', () => {
      const mockDispatch = jest.fn();
      const map = mapDispatchToProps(mockDispatch);
      map.addFavoriteToState();
      expect(mockDispatch).toHaveBeenCalled();
    });
    it('should map the store correctly if removeFavoriteFromState is dispatched', () => {
      const mockDispatch = jest.fn();
      const map = mapDispatchToProps(mockDispatch);
      map.removeFavoriteFromState();
      expect(mockDispatch).toHaveBeenCalled();
    });
    it('should map the store correctly if toggleMovieStatus is dispatched', () => {
      const mockDispatch = jest.fn();
      const map = mapDispatchToProps(mockDispatch);
      map.toggleMovieStatus();
      expect(mockDispatch).toHaveBeenCalled();
    });
  });
});
