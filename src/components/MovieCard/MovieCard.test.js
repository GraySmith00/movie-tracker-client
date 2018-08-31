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
});
