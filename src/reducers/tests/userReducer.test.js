import * as actions from '../../actions/userActions';
import { userReducer } from '../userReducer';
import { mockStore } from '../../mockData/mockStore';

describe('userReducer', () => {
  it('should return defualt state if action type is undefined', () => {
    const expected = null;

    const result = userReducer(undefined, {});

    expect(result).toEqual(expected);
  });

  it('should set currentUser state to value passed in', () => {
    const currentState = null;
    const expected = mockStore.currentUser;

    const result = userReducer(
      currentState,
      actions.setCurrentUser(mockStore.currentUser)
    );
    expect(result).toEqual(expected);
  });
});
