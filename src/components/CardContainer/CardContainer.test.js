import React from 'react';
import { shallow } from 'enzyme';
import { CardContainer } from './CardContainer';
import { mockStore } from '../../mockData/mockStore';
import { mockMovies } from '../../mockData/mockData';

describe('CardContainer', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <CardContainer movies={mockStore.movies} category="nowPlaying" />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should match the snapshot when category is favorites', () => {
    wrapper = shallow(
      <CardContainer movies={mockStore.movies} category="favorites" />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should match Snapshot if no favorites', () => {
    wrapper = shallow(
      <CardContainer movies={mockMovies} category="favorites" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
