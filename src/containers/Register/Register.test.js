import React from 'react';
import { shallow } from 'enzyme';
import { Register, mapDispatchToProps } from './Register';
import { mockStore } from '../../mockData/mockStore';
import configureMockStore from 'redux-mock-store';
import { setCurrentUser } from '../../actions/userActions';

describe('Register', () => {
  let wrapper;
  let store;
  let mockSetCurrentUser;
  let mockHistory;
  let mockSetRegisterErrorState;
  let mockRegisterError;
  const Store = configureMockStore();

  beforeEach(() => {
    mockHistory = jest.fn();
    mockSetCurrentUser = jest.fn();
    mockSetRegisterErrorState = jest.fn();
    mockRegisterError = '';

    store = Store(mockStore);
    wrapper = shallow(
      <Register
        store={store}
        setCurrentUser={mockSetCurrentUser}
        history={mockHistory}
        setRegisterErrorState={mockSetRegisterErrorState}
        error={mockRegisterError}
      />
    );
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should setState on handleChange', () => {
    const mockNameEvent = { target: { name: 'name', value: 'paul' } };
    const mockEmailEvent = { target: { name: 'email', value: 'paul@paul' } };
    const mockPasswordEvent = {
      target: { name: 'password', value: 'paulword' }
    };

    wrapper.instance().handleChange(mockNameEvent);
    expect(wrapper.state('name')).toEqual(mockNameEvent.target.value);

    wrapper.instance().handleChange(mockEmailEvent);
    expect(wrapper.state('email')).toEqual(mockEmailEvent.target.value);

    wrapper.instance().handleChange(mockPasswordEvent);
    expect(wrapper.state('password')).toEqual(mockPasswordEvent.target.value);
  });

  it('should call setRegisterErrorState if name email or password are empty strings', () => {
    let mockEvent = { preventDefault: () => jest.fn() };

    wrapper.setState({ name: '', email: '', password: '' });
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockSetRegisterErrorState).toHaveBeenCalledWith(
      'You are missing one or more required fields'
    );
  });

  it('should call setRegisterErrorState to set errors as an empty stringwith', () => {
    let mockEvent = { preventDefault: () => jest.fn() };
    wrapper.setState({ name: 'asdf', email: 'qwer', password: 'asdf' });

    wrapper.instance().handleSubmit(mockEvent);
    expect(mockSetRegisterErrorState).toHaveBeenCalledWith('');
  });

  it('should call setRegisterErrorState if email already exists', async () => {
    const mockResult = { error: 'Key (email)=(a) already exists.' };
    let mockEvent = { preventDefault: () => jest.fn() };

    wrapper.setState({ name: 'asdf', email: 'qwer', password: 'asdf' });
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResult)
      })
    );
    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockSetRegisterErrorState).toHaveBeenCalledWith(
      'a user with this email address already exists'
    );
  });

  it('should call setCurrentUser and add user if user does not exist', () => {
    const mockEvent = { preventDefault: () => jest.fn() };
    const mockUser = { name: 'asdf', email: 'qwer', password: 'asdf' };

    const expected = [
      'http://localhost:3000/api/users/new/',
      {
        method: 'POST',
        body: JSON.stringify(mockUser),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ];

    wrapper.instance().handleSubmit(mockEvent);

    expect(window.fetch).toHaveBeenCalledWith(...expected);
  });

  it('should reset the state when a new user is registered', () => {
    const mockEvent

    const addedUser = {
      name: 'Paul',
      email: 'Paul@paul.com',
      password: 'password'
    };
    const expected = {
      name: '',
      email: '',
      password: ''
    };
    wrapper.setState({
      name: 'Paul',
      email: 'Paul@paul.com',
      password: 'password'
    });

    wrapper.instance().handleSubmit();

    expect(wrapper.state()).toEqual(expected);
  });

  it('should setState to empty strings on handleSubmit if register user', async () => {
    const mockEvent = { preventDefault: () => jest.fn() };
    const mockResult = {
      status: 'success',
      message: 'New user created',
      id: 49
    };
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResult)
      })
    );

    const expected = { email: '', name: '', password: '' };
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });
  it('should route back to home page on user register', async () => {
    const mockEvent = { preventDefault: () => jest.fn() };
    const registerResult = {
      status: 'success',
      message: 'New user created',
      id: 49
    };

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(registerResult)
      })
    );
    const x = await wrapper.instance().handleSubmit(mockEvent);
  });

  it('should have the store', () => {
    store.dispatch(setCurrentUser(mockStore.currentUser));
    const actions = store.getActions();
    const expectedPayload = [
      {
        type: 'SET_CURRENT_USER',
        user: { id: 2, name: 'asdf', password: 'asdf', email: 'asdf' }
      }
    ];
    expect(actions).toEqual(expectedPayload);
  });

  it('should call setRegisterErrorState if request is rejected', async () => {
    const mockEvent = { preventDefault: () => jest.fn() };

    window.fetch = jest
      .fn()
      .mockImplementation(() => Promise.reject(new Error('failed')));
    let expected = 'You are missing one or more required fields';
    await wrapper.instance().handleSubmit(mockEvent);

    await expect(mockSetRegisterErrorState).toHaveBeenCalledWith(expected);
    await expect(mockSetRegisterErrorState).toHaveBeenCalled();
  });

  it('should map to store on mapDispatchToProps with setCurrentUser', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.setCurrentUser();
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('should map to store on mapDispatchToProps with setCurrentUser', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);
    mapped.setRegisterErrorState();
    expect(mockDispatch).toHaveBeenCalled();
  });
});
