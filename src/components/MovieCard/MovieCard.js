import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addFavorite } from '../../helpers';

import './MovieCard.css';

class MovieCard extends Component {
  handleFavoriteClick = () => {
    const { currentUser, movie } = this.props;
    if (!currentUser) {
      alert('Would you like to create an account to save favorites?, per se');
      return;
    } else {
      addFavorite(movie, currentUser);
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
      // trailer
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
        {/* <iframe src={trailer} width="300" /> */}
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

export default connect(mapStateToProps)(MovieCard);
