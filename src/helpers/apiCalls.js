import { key } from '../api-key';
import { movieCleaner } from './dataCleaners';

export const getNowPlaying = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`;
  const response = await fetch(url);
  const nowPlaying = await response.json();
  return movieCleaner(nowPlaying);
};

export const registerUser = async user => {
  const response = await fetch('http://localhost:3000/api/users/new/', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const result = await response.json();
  if (result.status === 'success') {
    return await findUser(user.email);
  }
};

export const findUser = async email => {
  const response = await fetch('http://localhost:3000/api/users');
  const users = await response.json();
  return users.data.find(user => user.email === email);
};

export const loginUser = async (email, password) => {
  const response = await fetch('http://localhost:3000/api/users');
  const users = await response.json();

  const user = users.data.find(user => user.email === email);
  return user;
};

export const addFavorite = async (movie, currentUser) => {
  const {
    movie_id,
    title,
    release_date,
    overview,
    poster_path,
    vote_average
  } = movie;
  const { id: user_id } = currentUser;
  const favoriteMovie = {
    movie_id,
    title,
    release_date,
    overview,
    poster_path,
    vote_average,
    user_id
  };

  const response = await fetch(
    'http://localhost:3000/api/users/favorites/new',
    {
      method: 'POST',
      body: JSON.stringify(favoriteMovie),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const addedFavorite = await response.json();
  if (addedFavorite.status === 'success') {
    return movie.movie_id;
  }
};

export const getFavorites = async currentUser => {
  const response = await fetch(`/api/users/${currentUser.id}/favorites`);
  const favorites = await response.json();
  return favorites;
};

export const removeFavorite = async (movie, currentUser) => {
  const response = await fetch(
    `/api/users/${currentUser.id}/favorites/${movie.movie_id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  const removedFavorite = await response.json();
<<<<<<< HEAD
=======

>>>>>>> 787face7b64792f884836c15ea3cdcf2fa1ab297
  if (removedFavorite.status === 'success') {
    return movie.movie_id;
  }
};

export const getMovieTrailer = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`;
  const videoResponse = await fetch(url);
  const videoInfo = await videoResponse.json();
  return videoInfo;
};
