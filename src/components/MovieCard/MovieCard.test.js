import React from 'react';
import { shallow } from 'enzyme';
import { MovieCard } from './MovieCard';
import { mockStore } from '../../mockData/mockStore';

describe('MovieCard', () => {
  console.log(mockStore);
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <MovieCard
        movies={mockStore.movies}
        currentUser={mockStore.currentUser}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
