const initialState = {
  registerError: '',
  loginError: '',
  favoriteError: ''
};

export const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_REGISTER_ERROR_STATE':
      return {
        ...state,
        registerError: action.errorMessage
      };

    case 'SET_LOGIN_ERROR_STATE':
      return {
        ...state,
        loginError: action.errorMessage
      };
    case 'SET_FAVORITES_ERROR_STATE':
      return {
        ...state,
        favoriteError: action.errorMessage
      };
    default:
      return state;
  }
};
