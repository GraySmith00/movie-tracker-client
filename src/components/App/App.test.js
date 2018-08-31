import React from 'react';
import { shallow } from 'enzyme';
import { App } from './App';
import { nowPlayingResultsArray } from '../../mockData/mockData';

describe('App', () => {
  let wrapper;

  beforeEach(async () => {
    wrapper = shallow(<App />);
    await wrapper.instance().componentDidMount;
    window.fetch = jest.fn().mockImplementation(() => {
      Promise.resolve({ json: () => Promise.resolve(nowPlayingResultsArray) });
    });
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
