import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './CardContainer.css';

export const CardContainer = ({ movies, category }) => {
  let displayCards;
  if (category === 'favorites') {
    if (movies.favorites.length === 0) {
      displayCards = <p>You have not added anything to your favorites yet!</p>;
    } else {
      displayCards = movies[category].map(movieId => {
        const movie = movies.nowPlaying.find(
          movie => movie.movie_id === movieId
        );
        return <MovieCard key={movie.movie_id} movie={movie} />;
      });
    }
  } else {
    displayCards = movies[category].map(movie => {
      return <MovieCard key={movie.movie_id} movie={movie} />;
    });
  }

  return <div className="card-container">{displayCards}</div>;
};

CardContainer.propTypes = {
  movies: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  movies: state.movies
});

export default connect(mapStateToProps)(CardContainer);
