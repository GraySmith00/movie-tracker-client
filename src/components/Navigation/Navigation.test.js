import React from 'react';
import { shallow } from 'enzyme';
import Navigation from './Navigation';

describe('Navigation', () => {
  let wrapper;
  let logoutUser;

  beforeEach(() => {
    logoutUser = jest.fn();
    wrapper = shallow(<Navigation logoutUser={logoutUser} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call logoutUser on click', () => {
    wrapper.find('.nav-link-logout').simulate('click');
    expect(logoutUser).toHaveBeenCalled();
  });
});
