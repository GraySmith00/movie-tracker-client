import React from 'react';
import { shallow } from 'enzyme';
import { Navigation, mapDispatchToProps } from './Navigation';
import { mockStore } from '../../mockData/mockStore';
import { clearFavorites } from '../../actions/movieActions';

describe('Navigation', () => {
  let wrapper;
  let mockSetCurrentUser;
  let mockClearFavorites;
  let mockHistory;

  beforeEach(() => {
    mockSetCurrentUser = jest.fn();
    mockClearFavorites = jest.fn();
    mockHistory = {
      length: 14,
      action: 'PUSH',
      location: { pathname: '/', search: '', hash: '', key: 'opw812' },
      replace: jest.fn()
    };

    wrapper = shallow(
      <Navigation
        setCurrentUser={mockSetCurrentUser}
        clearFavorites={mockClearFavorites}
        currentUser={null}
        history={mockHistory}
      />
    );
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot when currentUser exists', () => {
    wrapper = shallow(
      <Navigation
        setCurrentUser={mockSetCurrentUser}
        clearFavorites={mockClearFavorites}
        currentUser={mockStore.currentUser}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should setCurrentUser and clearFavorites when logOut user is called', () => {
    wrapper.instance().logoutUser();

    expect(mockSetCurrentUser).toHaveBeenCalledWith(null);
    expect(mockClearFavorites).toHaveBeenCalled();
  });

  it('should map to store on mapStateToDispatch of setCurrentUser', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.setCurrentUser(mockStore.currentUser);

    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should map to store on mapStateToDispatch of setCurrentUser', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.clearFavorites();

    expect(mockDispatch).toHaveBeenCalled();
  });
});
