import * as actions from '../userActions';
import { mockStore } from '../../mockData/mockStore';

describe('all user actions', () => {
  it('should return a type of SET_CURRENT_USER with user', () => {
    const user = mockStore.currentUser;
    const expected = {
      type: 'SET_CURRENT_USER',
      user
    };
    expect(actions.setCurrentUser(user)).toEqual(expected);
  });
});
