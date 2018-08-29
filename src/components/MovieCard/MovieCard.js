import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './MovieCard.css';

class MovieCard extends Component {
  handleFavoriteClick = () => {
    const { currentUser, movie } = this.props;
    if (!currentUser) {
      alert('Would you like to create an account to save favorites?, per se');
      return;
    } else {
      // this.props.toggleFavorite(movie);
    }
  };

  render() {
    const {
      id,
      title,
      releaseDate,
      overview,
      img,
      favorite,
      trailer
    } = this.props.movie;
    return (
      <div className="movie-card">
        <h1>{title}</h1>
        <p>{releaseDate}</p>
        <p>{overview}</p>
        <img src={img} alt="movie poster" width="150" />
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
