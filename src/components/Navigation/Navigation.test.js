import React from 'react';
import { shallow } from 'enzyme';
import { Navigation } from './Navigation';
import { mockStore } from '../../mockData/mockStore';
import { clearFavorites } from '../../actions/movieActions';

describe('Navigation', () => {
  let wrapper;
  let mockSetCurrentUser;
  let mockClearFavorites;

  beforeEach(() => {
    mockSetCurrentUser = jest.fn();
    mockClearFavorites = jest.fn();

    wrapper = shallow(
      <Navigation
        setCurrentUser={mockSetCurrentUser}
        clearFavorites={mockClearFavorites}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  // it('should call logoutUser on click', () => {
  //   wrapper.find('.nav-link-logout').simulate('click');
  //   console.log(wrapper.state());
  // });
});
