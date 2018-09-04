const initialState = JSON.parse(localStorage.getItem('currentUser')) || null;

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.user;
    default:
      return state;
  }
};
