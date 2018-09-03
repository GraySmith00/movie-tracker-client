import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  addFavorite,
  getFavorites,
  removeFavorite,
  getMovieTrailer
} from '../../helpers/apiCalls';
import {
  addFavoriteToState,
  removeFavoriteFromState,
  toggleMovieStatus,
  addTrailerToState
} from '../../actions/movieActions';
import { setFavoritesErrorState } from '../../actions/errorActions';

import './MovieCard.css';
import StarRatingComponent from 'react-star-rating-component';

export class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      hover: false
    };
  }
  handleFavoriteClick = async () => {
    const { currentUser, movie, setFavoritesErrorState } = this.props;

    if (!currentUser) {
      setFavoritesErrorState('Please create an account to add favorites');
      return;
    }
    const favorites = await getFavorites(currentUser);
    const alreadyFavorite = favorites.data.find(
      favorite => favorite.movie_id === movie.movie_id
    );
    this.handleAlreadyFavorite(alreadyFavorite);
  };

  handleAlreadyFavorite = async alreadyFavorite => {
    const {
      currentUser,
      movie,
      addFavoriteToState,
      removeFavoriteFromState,
      toggleMovieStatus
    } = this.props;
    if (alreadyFavorite) {
      const removedMovieId = await removeFavorite(movie, currentUser);
      toggleMovieStatus(movie);
      await removeFavoriteFromState(removedMovieId);
    } else {
      const addedMovieId = await addFavorite(movie, currentUser);
      toggleMovieStatus(movie);
      await addFavoriteToState(addedMovieId);
    }
  };

  handleMovieClick = async movieId => {
    const trailerLink = await getMovieTrailer(movieId);
    const trailer = `https://www.youtube.com/embed/${
      trailerLink.results[0].key
    }?autoplay=1`;
    this.props.addTrailerToState(trailer);
  };

  hoverOn = () => {
    this.setState({ hover: true });
  };
  hoverOff = () => {
    this.setState({ hover: false });
  };

  render() {
    const {
      title,
      release_date,
      overview,
      poster_path,
      vote_average,
      favorite,
      movie_id
    } = this.props.movie;
    return (
      <div
        onClick={e => this.handleMovieClick(movie_id)}
        onMouseEnter={this.hoverOn}
        onMouseLeave={this.hoverOff}
        className="movie-card"
        style={{
          backgroundImage: 'url(' + `${poster_path}` + ')'
        }}
      >
        <div className={this.state.hover ? 'overlay' : 'display-none'}>
          <h3>{title}</h3>
          <p>Released: {release_date}</p>
          <p className="overview-text">
            {overview.length > 150 ? `${overview.slice(0, 150)}...` : overview}
          </p>
          <div>
            <StarRatingComponent
              name="rate2"
              editing={false}
              renderStarIcon={() => <span>★</span>}
              starCount={10}
              value={vote_average}
            />
          </div>
          <i
            onClick={this.handleFavoriteClick}
            className={`star ${favorite ? 'fas fa-heart' : 'far fa-heart'}`}
          />
        </div>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  currentUser: PropTypes.object,
  addFavoriteToState: PropTypes.func.isRequired,
  removeFavoriteFromState: PropTypes.func.isRequired,
  toggleMovieStatus: PropTypes.func.isRequired,
  addTrailerToState: PropTypes.func
};

export const mapStateToProps = state => ({
  currentUser: state.currentUser,
  error: state.errors.favoriteError
});

export const mapDispatchToProps = dispatch => ({
  addFavoriteToState: movieId => dispatch(addFavoriteToState(movieId)),
  removeFavoriteFromState: movieId =>
    dispatch(removeFavoriteFromState(movieId)),
  toggleMovieStatus: movie => dispatch(toggleMovieStatus(movie)),
  setFavoritesErrorState: message => dispatch(setFavoritesErrorState(message)),
  addTrailerToState: trailer => dispatch(addTrailerToState(trailer))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieCard);
