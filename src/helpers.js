import { key } from './api-key';

export const getNowPlaying = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`;
  const response = await fetch(url);
  const nowPlaying = await response.json();
  return nowPlaying.results;
};
