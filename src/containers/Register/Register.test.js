import React from 'react';
import { shallow } from 'enzyme';
import { Register } from './Register';

describe('Register', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Register />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
