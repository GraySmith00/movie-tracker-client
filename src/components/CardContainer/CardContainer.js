import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CardContainer = ({ movies, category }) => {
  let displayCards;
  if (category === 'favorites') {
    displayCards = movies[category].map(movieId => {
      const movie = movies.nowPlaying.find(movie => movie.movie_id === movieId);

      return <MovieCard key={movie.movie_id} movie={movie} />;
    });
  } else {
    displayCards = movies[category].map(movie => (
      <MovieCard key={movie.movie_id} movie={movie} />
    ));
  }

  return <div>{displayCards}</div>;
};

CardContainer.propTypes = {
  movies: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(CardContainer);
