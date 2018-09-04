import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapStateToProps, mapDispatchToProps } from './Login';
import { mockStore } from '../../mockData/mockStore';
import configueMockStore from 'redux-mock-store';

describe('Login', () => {
  let wrapper;
  let mockSetCurrentUser;
  let mockPopulateFavoritesState;

  let store;
  let mockSetLoginErrorState;
  let mockError;
  const Store = configueMockStore();

  beforeEach(() => {
    store = Store(mockStore.currentUser);
    mockSetCurrentUser = jest.fn();
    mockPopulateFavoritesState = jest.fn();
    mockSetLoginErrorState = jest.fn();
    mockError = '';

    wrapper = shallow(
      <Login
        store={store}
        setCurrentUser={mockSetCurrentUser}
        populateFavoritesState={mockPopulateFavoritesState}
        currentUser={mockStore.currentUser}
        setLoginErrorState={mockSetLoginErrorState}
        error={mockError}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle change should set email on user input', () => {
    const mockEvent = { target: { name: 'email', value: 'pykim@gmail.com' } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('email')).toEqual(mockEvent.target.value);
  });

  it('should handle change should set password on user input', () => {
    const mockEvent = { target: { name: 'password', value: 'flakeMaster' } };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state('password')).toEqual(mockEvent.target.value);
  });

  it('should set call populateFavoritesState when setFavoritesState is called', async () => {
    const mockResult = {
      status: 'success',
      data: [
        {
          id: 88,
          movie_id: 345940,
          user_id: 19,
          title: 'The Meg',
          poster_path:
            'http://image.tmdb.org/t/p/original/xqECHNvzbDL5I3iiOVUkVPJMSbc.jpg',
          release_date: '2018-08-09',
          vote_average: '6.2',
          overview:
            'A deep sea submersible pilot revisits his past fears in the Mariana Trench, and accidentally unleashes the seventy foot ancestor of the Great White Shark believed to be extinct.'
        },
        {
          id: 87,
          movie_id: 353081,
          user_id: 19,
          title: 'Mission: Impossible - Fallout',
          poster_path:
            'http://image.tmdb.org/t/p/original/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg',
          release_date: '2018-07-25',
          vote_average: '7.3',
          overview:
            'When an IMF mission ends badly, the world is faced with dire consequences. As Ethan Hunt takes it upon himself to fulfil his original briefing, the CIA begin to question his loyalty and his motives. The IMF team find themselves in a race against time, hunted by assassins while trying to prevent a global catastrophe.'
        }
      ],
      message: 'Retrieved All favorites'
    };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResult)
      })
    );

    await wrapper.instance().setFavoritesState();
    expect(mockPopulateFavoritesState).toHaveBeenCalled();
    expect(window.fetch).toHaveBeenCalledWith('/api/users/2/favorites');
  });

  it('should handleSubmit ', async () => {
    wrapper.setState({ email: 'a', password: 'a' });

    const mockEvent = { preventDefault: () => jest.fn() };
    const mockResult = {
      status: 'success',
      data: [
        { id: 19, name: 'paul Kim', password: 'a', email: 'a' },
        { id: 21, name: 'paul', password: 'a', email: 'sd' },
        { id: 23, name: 'asd', password: 'vff', email: 'asdc' },
        { id: 24, name: 'paul', password: 'dffds', email: 'kim' },
        { id: 25, name: 'fdsgsd', password: 'gsbvxc', email: 'gsfdg' },
        { id: 26, name: 'asdfg', password: 'rewr', email: 'fcxv' }
      ]
    };

    const expected = { email: '', password: '' };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResult)
      })
    );
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state()).toEqual(expected);
    expect(mockSetCurrentUser).toHaveBeenCalled();
  });

  it('should call setLoginErrorState if email or password empty strings', () => {
    const mockEvent = { preventDefault: () => jest.fn() };

    wrapper.setState({ email: '' });
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockSetLoginErrorState).toHaveBeenCalled();
  });

  it('should call setLoginErrorState if email or password does not exist', async () => {
    const loginResponse = {
      status: 'success',
      data: [
        { id: 74, name: 'sdf', password: 'arqew', email: 'cvzxcv' },
        { id: 76, name: 'qwre', password: 'afdqr', email: 'av' },
        { id: 77, name: 'qwre', password: 'afdqr', email: 'avfasdf' },
        { id: 80, name: 'qwer', password: 'erqwedasf', email: 'fasf' }
      ],
      message: 'Retrieved All Users'
    };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(loginResponse)
      })
    );
    const mockEvent = { preventDefault: () => jest.fn() };
    const mockNoUser = {};
    wrapper = shallow(
      <Login
        store={store}
        setCurrentUser={mockSetCurrentUser}
        populateFavoritesState={mockPopulateFavoritesState}
        currentUser={mockNoUser}
        setLoginErrorState={mockSetLoginErrorState}
      />
    );
    wrapper.setState({ email: 'erty', password: 'erty' });

    await wrapper.instance().handleSubmit(mockEvent);

    expect(mockSetLoginErrorState).toHaveBeenCalledWith(
      'Sorry there is no user associated with this email.'
    );
  });

  it('should call loginErrorState if password does not match', async () => {
    const loginResponse = {
      status: 'success',
      data: [
        { id: 74, name: 'sdf', password: 'arqew', email: 'cvzxcv' },
        { id: 76, name: 'qwre', password: 'afdqr', email: 'av' },
        { id: 77, name: 'qwre', password: 'afdqr', email: 'avfasdf' },
        { id: 80, name: 'qwer', password: 'erqwedasf', email: 'fasf' }
      ],
      message: 'Retrieved All Users'
    };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(loginResponse)
      })
    );
    const mockEvent = { preventDefault: () => jest.fn() };
    const mockNoUser = {};
    wrapper = shallow(
      <Login
        store={store}
        setCurrentUser={mockSetCurrentUser}
        populateFavoritesState={mockPopulateFavoritesState}
        currentUser={mockNoUser}
        setLoginErrorState={mockSetLoginErrorState}
      />
    );
    wrapper.setState({ email: 'fasf', password: 'testingTheSonuvaGun' });

    await wrapper.instance().handleSubmit(mockEvent);

    expect(mockSetLoginErrorState).toHaveBeenCalledWith(
      'Email and Password do not match'
    );
  });

  it('should call history if currentUser exists', () => {
    const loginResponse = {
      status: 'success',
      data: [
        { id: 74, name: 'sdf', password: 'arqew', email: 'cvzxcv' },
        { id: 76, name: 'qwre', password: 'afdqr', email: 'av' },
        { id: 77, name: 'qwre', password: 'afdqr', email: 'avfasdf' },
        { id: 80, name: 'qwer', password: 'erqwedasf', email: 'fasf' }
      ],
      message: 'Retrieved All Users'
    };
    const mockEvent = { preventDefault: () => jest.fn() };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(loginResponse)
      })
    );

    wrapper.setState({ email: 'av', password: 'afdqr' });

    wrapper.instance().handleSubmit(mockEvent);

    expect(mockPopulateFavoritesState);
  });

  it('should map store correctly', () => {
    const expected = { email: 'asdf', id: 2, name: 'asdf', password: 'asdf' };
    const mapped = mapStateToProps(mockStore);
    expect(mapped.currentUser).toEqual(expected);
  });

  it('should call the dispatch function when using setCurrentUser from map dispatch to props', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.setCurrentUser();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call the dispatch function when using populateFavoritesState from map dispatch to props', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.populateFavoritesState(mockDispatch);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should call the dispatch function when using setLoginErrorState from map dispatch to props', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.setLoginErrorState(mockDispatch);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
