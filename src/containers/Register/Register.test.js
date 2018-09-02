import React from 'react';
import { shallow } from 'enzyme';
import { Register, mapDispatchToProps } from './Register';
import { mockStore } from '../../mockData/mockStore';
import configureMockStore from 'redux-mock-store';
import { setCurrentUser } from '../../actions/userActions';
import { setRegisterErrorState } from '../../actions/errorActions';

describe('Register', () => {
  let wrapper;
  let store;
  let mockSetCurrentUser;
  let mockHistory;
  let mockSetRegisterErrorState;
  const Store = configureMockStore();

  beforeEach(() => {
    mockHistory = jest.fn();
    mockSetCurrentUser = jest.fn();
    mockSetRegisterErrorState = jest.fn();
    store = Store(mockStore);
    wrapper = shallow(
      <Register
        store={store}
        setCurrentUser={mockSetCurrentUser}
        history={mockHistory}
        setRegisterErrorState={mockSetRegisterErrorState}
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

  it('should call setCurrentUser on handleSubmit', async () => {
    let mockEvent = { preventDefault: () => jest.fn() };

    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockSetCurrentUser).toHaveBeenCalled();
  });

  it('should setState to empty strings on handleSubmit if register user', async () => {
    const mockEvent = { preventDefault: () => jest.fn() };
    const expected = { email: '', name: '', password: '' };
    wrapper.setState({
      name: 'paul',
      email: 'paul@paul',
      password: 'paulword'
    });
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
