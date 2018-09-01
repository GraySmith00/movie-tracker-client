export const movieCleaner = data => {
  const { results } = data;
  const modifiedObj = results.map(result => {
    return {
      movie_id: result.id,
      title: result.title,
      release_date: result.release_date,
      overview: result.overview,
      vote_average: result.vote_average,
      poster_path: `http://image.tmdb.org/t/p/original${result.poster_path}`,
      favorite: false
    };
  });
  return modifiedObj;
};
