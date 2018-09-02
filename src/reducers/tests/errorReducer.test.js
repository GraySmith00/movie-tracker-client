import * as actions from '../../actions/errorActions';
import { errorReducer } from '../errorReducer';
import { mockStore } from '../../mockData/mockStore';

describe('errorReducer', () => {
  let mockDefaultErrorState;

  beforeEach(() => {
    mockDefaultErrorState = {
      registerError: '',
      loginError: ''
    };
  });
  it('should return initial state on default', () => {
    const expected = {
      registerError: '',
      loginError: ''
    };
    expect(errorReducer(undefined, {})).toEqual(expected);
  });

  it('should return the proper state when a login error occurs', () => {
    const expected = { registerError: '', loginError: 'Incorrect fields' };
    const result = errorReducer(
      mockDefaultErrorState,
      actions.setLoginErrorState('Incorrect fields')
    );
    expect(result).toEqual(expected);
  });

  it('should return the proper state when a register error occurs ', () => {
    const expected = { registerError: 'user already exists', loginError: '' };
    const result = errorReducer(
      mockDefaultErrorState,
      actions.setRegisterErrorState('user already exists')
    );
    expect(result).toEqual(expected);
  });
});
