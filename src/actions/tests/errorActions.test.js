import * as actions from '../errorActions';
import { mockStore } from '../../mockData/mockStore';

describe('all error actions', () => {
  it('should return a type of SET_REGISTER_ERROR_STATE', () => {
    const errorMessage = mockStore.errors;
    const expected = {
      type: 'SET_REGISTER_ERROR_STATE',
      errorMessage
    };
    expect(actions.setRegisterErrorState(errorMessage)).toEqual(expected);
  });

  it('should return a type of SET_LOGIN_ERROR_STATE', () => {
    const errorMessage = mockStore.errors;
    const expected = {
      type: 'SET_LOGIN_ERROR_STATE',
      errorMessage
    };
    expect(actions.setLoginErrorState(errorMessage)).toEqual(expected);
  });
});
