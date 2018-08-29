import { getNowPlaying } from "../helpers";

export const getNowPlaying = () => dispatch =>
  dispatch({
    type: "GET_NOW_PLAYING",
    payload: getNowPlaying()
  });
