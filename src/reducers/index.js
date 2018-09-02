import { combineReducers } from 'redux';
import { movieReducer } from './movieReducer';
import { userReducer } from './userReducer';
import { errorReducer } from './errorReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  currentUser: userReducer,
  errors: errorReducer
});

export default rootReducer;
