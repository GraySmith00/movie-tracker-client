import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CardContainer = ({ movies, category }) => {
  const displayCards = movies[category].map(movie => (
    <MovieCard key={movie.id} movie={movie} />
  ));

  return <div>{displayCards}</div>;
};

CardContainer.propTypes = {
  movies: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(CardContainer);
