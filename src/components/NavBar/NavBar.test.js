import React from 'react';
import { shallow } from 'enzyme';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  let wrapper;
  let logoutUser;

  beforeEach(() => {
    logoutUser = jest.fn();
    wrapper = shallow(<NavBar logoutUser={logoutUser} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call logoutUser on click', () => {
    wrapper.find('.nav-link-logout').simulate('click');
    expect(logoutUser).toHaveBeenCalled();
  });
});
