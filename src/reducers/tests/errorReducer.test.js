import * as actions from '../../actions/errorActions';
import { errorReducer } from '../errorReducer';
import { mockStore } from '../../mockData/mockStore';

describe('errorReducer', () => {
  let mockDefaultErrorState;

  beforeEach(() => {
    mockDefaultErrorState = {
      registerError: '',
      loginError: '',
      favoriteError: ''
    };
  });
  it('should return initial state on default', () => {
    const expected = {
      registerError: '',
      loginError: '',
      favoriteError: ''
    };
    expect(errorReducer(undefined, {})).toEqual(expected);
  });

  it('should return the proper state when a login error occurs', () => {
    const expected = {
      registerError: '',
      loginError: 'Incorrect fields',
      favoriteError: ''
    };
    const result = errorReducer(
      mockDefaultErrorState,
      actions.setLoginErrorState('Incorrect fields')
    );
    expect(result).toEqual(expected);
  });

  it('should return the proper state when a register error occurs ', () => {
    const expected = {
      registerError: 'user already exists',
      loginError: '',
      favoriteError: ''
    };
    const result = errorReducer(
      mockDefaultErrorState,
      actions.setRegisterErrorState('user already exists')
    );
    expect(result).toEqual(expected);
  });

  it('should return the proper state when a favorite error occurs', () => {
    const expected = {
      registerError: '',
      loginError: '',
      favoriteError: 'Create account to add favorites'
    };
    const result = errorReducer(
      mockDefaultErrorState,
      actions.setFavoritesErrorState('Create account to add favorites')
    );
    expect(result).toEqual(expected);
  });
});
