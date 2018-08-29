const initialState = {
  nowPlaying: []
};

export const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_NOW_PLAYING":
      return {
        ...state,
        nowPlaying: action.payload
      };

    default:
      return state;
  }
};
