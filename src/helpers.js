import { key } from "./api-key";

export const getNowPlaying = async () => {
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`;
  const response = await fetch(url);
  const nowPlaying = await response.json();
  const videoDetails = await getMovieTrailer(353081);
  const scrapedNowPlaying = await scrapeNowPlaying(nowPlaying, videoDetails);

  return scrapedNowPlaying;
};

const scrapeNowPlaying = (data, vidData) => {
  const { results } = data;
  const modifiedObj = results.map(result => {
    return {
      movie_id: result.id,
      title: result.title,
      release_date: result.release_date,
      overview: result.overview,
      vote_average: result.vote_average,
      poster_path: `http://image.tmdb.org/t/p/original${result.poster_path}`,
      trailer: `https://www.youtube.com/embed/${vidData.results[0].key}`,
      favorite: false
    };
  });
  return modifiedObj;
};

const getMovieTrailer = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${key}`;
  const videoResponse = await fetch(url);
  const videoInfo = await videoResponse.json();
  return videoInfo;
};

export const populateSearch = async input => {
  const url = `https://api.themoviedb.org/3/search/person?api_key=${key}&query=${input}`;
  const searchResponse = await fetch(url);
  const searchResult = await searchResponse.json();
  // const searchedPaul = await searchforPaul(searchResult);
  // return searchedPaul;
  return searchResult;
};

export const searchforPaul = async paulResponse => {
  const paulMovies = await paulResponse.results.map(async response => {
    const knownPaulMovies = await response.known_for.map(async movie => {
      const paulMovies = await getPaulMovies(movie.id);
      return paulMovies;
    });
    return await Promise.all([...knownPaulMovies]);
  });

  const paulPromises = await Promise.all([...paulMovies]);
  scrapePaulMovies(paulPromises);
};

const getPaulMovies = async id => {
  if (!id) return;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`;
  const response = await fetch(url);
  const result = await response.json();
  return await scrapeGetPaul(result);
};

const scrapeGetPaul = async result => {
  // const trailer = await getMovieTrailer(result.id);
  return {
    Id: result.id,
    Title: result.title,
    "Realease Date": result.release_date,
    Overview: result.overview,
    Img: `http://image.tmdb.org/t/p/original${result.poster_path}`,
    // Trailer: `https://www.youtube.com/embed/${trailer.results[0].key}`,
    Rating: result.vote_average,
    favorite: false
  };
};

const scrapePaulMovies = async movies => {
  const x = movies.reduce((allMovies, movie) => {
    movie.forEach(movi => {
      return movi.Id ? (allMovies = [...allMovies, movi]) : null;
    });
    return allMovies;
  }, []);
};

export const registerUser = async user => {
  if (!user.email) {
    alert("must provide an email");
    return;
  }
  if (!user.password) {
    alert("must provide a password");
    return;
  }
  if (!user.name) {
    alert("must provide a name");
    return;
  }
  const response = await fetch("http://localhost:3000/api/users/new/", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (response.status === 200) {
    return await findUser(user.email);
  } else {
    alert("a user with this email address already exists");
    return;
  }
};

export const findUser = async email => {
  const response = await fetch("http://localhost:3000/api/users");
  const users = await response.json();
  return users.data.find(user => user.email === email);
};

export const loginUser = async (email, password) => {
  const response = await fetch("http://localhost:3000/api/users");
  const users = await response.json();
  const user = users.data.find(user => user.email === email);
  if (!user) {
    alert("Sorry there is no user with this email");
    return;
  }
  if (user.password !== password) {
    alert("Incorrect password");
    return;
  }
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
  console.log(favoriteMovie);

  const response = await fetch(
    "http://localhost:3000/api/users/favorites/new",
    {
      method: "POST",
      body: JSON.stringify(favoriteMovie),
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  console.log(response);
};
