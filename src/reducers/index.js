import { combineReducers } from "redux";
import { movieReducer } from "./movieReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  currentUser: userReducer
});

export default rootReducer;
