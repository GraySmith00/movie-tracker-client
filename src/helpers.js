import { key } from './api-key';

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
      id: result.id,
      title: result.title,
      releaseDate: result.release_date,
      overview: result.overview,
      img: `http://image.tmdb.org/t/p/original${result.poster_path}`,
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
    'Realease Date': result.release_date,
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
  console.log(x);
};
