export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...action.user
      };

    default:
      return state;
  }
};
