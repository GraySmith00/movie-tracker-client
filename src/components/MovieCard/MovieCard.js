import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFavorite, getFavorites, removeFavorite } from '../../helpers';
import { updateFavorites } from '../../actions/movieActions';
import './MovieCard.css';

class MovieCard extends Component {
  handleFavoriteClick = async () => {
    const { currentUser, movie, updateFavorites } = this.props;
    if (!currentUser) {
      alert('Would you like to create an account to save favorites?, per se');
      return;
    } else {
      const favorites = await getFavorites(currentUser);
      const alreadyFavorite = favorites.data.find(
        favorite => favorite.movie_id === movie.movie_id
      );

      if (alreadyFavorite) {
        movie.favorite = false;
        await removeFavorite(movie, currentUser);
        const favorites = await getFavorites(currentUser);
        const favoriteIds = favorites.data
          .filter(favorite => favorite.movie_id !== movie.movie_id)
          .map(favorite => favorite.movie_id);
        updateFavorites([...favoriteIds]);
      } else {
        await addFavorite(movie, currentUser);
        const favorites = await getFavorites(currentUser);
        const favoritesIds = favorites.data.map(favorite => favorite.movie_id);
        updateFavorites([...favoritesIds, movie.movie_id]);
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
  updateFavorites: favorites => dispatch(updateFavorites(favorites))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieCard);
