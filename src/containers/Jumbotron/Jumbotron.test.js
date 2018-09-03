import React from 'react';
import { shallow } from 'enzyme';
import { Jumbotron } from './Jumbotron';
import { mockStore } from '../../mockData/mockStore';

describe('Jumbotron component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Jumbotron nowPlayingMovies={mockStore.movies.nowPlaying} />
    );
  });

  it('should decrease the currentIndex when goToPrevSlide is called, if the currentIndex is greater than 0', () => {
    wrapper.setState({
      currentIndex: 3
    });

    wrapper.instance().goToPrevSlide();

    expect(wrapper.state().currentIndex).toEqual(2);
  });

  it('should not decrease the currentIndex if it is already 0', () => {
    wrapper.setState({
      currentIndex: 0
    });

    wrapper.instance().goToPrevSlide();

    expect(wrapper.state().currentIndex).toEqual(0);
  });

  it('should increase the currentIndex when goToNextSlide is called, if the currentIndex is less than the array length', () => {
    wrapper.setState({
      currentIndex: 3
    });

    wrapper.instance().goToNextSlide();

    expect(wrapper.state().currentIndex).toEqual(4);
  });

  it('should not increase the currentIndex if the currentIndex is at the array length', () => {
    wrapper.setState({
      currentIndex: 7
    });

    wrapper.instance().goToNextSlide();

    expect(wrapper.state().currentIndex).toEqual(7);
  });

  it('should match the snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
