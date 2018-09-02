const initialState = {
  registerError: '',
  loginError: ''
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

    default:
      return state;
  }
};
