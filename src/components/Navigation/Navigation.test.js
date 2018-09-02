import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from './Navigation';
import { mockStore } from '../../mockData/mockStore';
import { clearFavorites } from '../../actions/movieActions';

describe('Navigation', () => {
  let wrapper;
  let setCurrentUser;
  let clearFavorites;

  beforeEach(() => {
    setCurrentUser = jest.fn();
    clearFavorites = jest.fn();

    wrapper = shallow(
      <Navigation
        setCurrentUser={setCurrentUser}
        clearFavorites={clearFavorites}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should setCurrentUser and clearFavorites when logOut user is called', () => {
    wrapper.instance().logoutUser();

    expect(setCurrentUser).toHaveBeenCalled();
    expect(setCurrentUser).toHaveBeenCalledWith(null);

    expect(clearFavorites).toHaveBeenCalled();
  });

  it('should call logoutUser on click', () => {
    wrapper.find('.nav-link-logout').simulate('click');
    expect(setCurrentUser).toHaveBeenCalled();
    expect(clearFavorites).toHaveBeenCalled();
  });
});
