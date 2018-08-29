import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';

const CardContainer = ({ movies, category }) => {
  const displayCards = movies[category].map(movie => (
    <MovieCard key={movie.id} {...movie} />
  ));

  return <div>{displayCards}</div>;
};

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(CardContainer);
