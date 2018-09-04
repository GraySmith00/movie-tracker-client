import React from 'react';
import { shallow } from 'enzyme';

import { Modal } from './Modal';

describe('Modal component', () => {
  let wrapper;
  let mockTrailer;

  beforeEach(() => {
    mockTrailer = 'https://www.youtube.com/embed/bsLk0NPRFAc?autoplay=1';
    wrapper = shallow(<Modal trailer={mockTrailer} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
