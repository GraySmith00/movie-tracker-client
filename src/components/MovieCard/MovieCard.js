import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFavorite, getFavorites, removeFavorite } from '../../helpers';
import {
  addFavoriteToState,
  removeFavoriteFromState,
  toggleMovieStatus
} from '../../actions/movieActions';
import './MovieCard.css';

export class MovieCard extends Component {
  handleFavoriteClick = async () => {
    const {
      currentUser,
      movie,
      addFavoriteToState,
      removeFavoriteFromState,
      toggleMovieStatus
    } = this.props;
    console.log(currentUser);
    if (!currentUser) {
      alert('Would you like to create an account to save favorites?, per se');
      return;
    } else {
      const favorites = await getFavorites(currentUser);
      const alreadyFavorite = favorites.data.find(
        favorite => favorite.movie_id === movie.movie_id
      );

      if (alreadyFavorite) {
        const removedMovieId = await removeFavorite(movie, currentUser);
        toggleMovieStatus(movie);
        await removeFavoriteFromState(removedMovieId);
      } else {
        const addedMovieId = await addFavorite(movie, currentUser);
        toggleMovieStatus(movie);
        await addFavoriteToState(addedMovieId);
      }
    }
  };

  render() {
    const {
      title,
      release_date,
      overview,
      poster_path,
      vote_average,
      favorite
    } = this.props.movie;
    return (
      <div className="movie-card">
        <h1>{title}</h1>
        <p>{release_date}</p>
        <p>{overview}</p>
        <p>{vote_average}</p>
        <img src={poster_path} alt="movie poster" width="150" />
        <i
          onClick={this.handleFavoriteClick}
          className={`star ${favorite ? 'fas fa-heart' : 'far fa-heart'}`}
        />
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  currentUser: PropTypes.object
};

const mapStateToProps = state => ({
  currentUser: state.currentUser
});

const mapDispatchToProps = dispatch => ({
  addFavoriteToState: movieId => dispatch(addFavoriteToState(movieId)),
  removeFavoriteFromState: movieId =>
    dispatch(removeFavoriteFromState(movieId)),
  toggleMovieStatus: movie => dispatch(toggleMovieStatus(movie))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieCard);
