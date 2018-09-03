import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Slide from '../Slide/Slide';

import './Jumbotron.css';

export class Jumbotron extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
  }

  goToPrevSlide = () => {
    if (this.state.currentIndex > 0) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex - 1
      }));
    }
  };

  goToNextSlide = () => {
    const jumboMovies = this.props.nowPlayingMovies.slice(0, 7);
    if (this.state.currentIndex < jumboMovies.length - 1) {
      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1
      }));
    }
  };

  render() {
    const { currentIndex } = this.state;
    const { nowPlayingMovies } = this.props;
    const jumboMovies = nowPlayingMovies.slice(0, 7);

    return (
      <div className="jumbotron">
        {jumboMovies[currentIndex] && (
          <Slide movie={jumboMovies[currentIndex]} />
        )}
        <section className="arrow-icons-container">
          <div className="backArrow">
            <i
              className="fas fa-angle-left jumbo-arrow"
              onClick={this.goToPrevSlide}
            />
          </div>
          <div className="nextArrow">
            <i
              className="fas fa-angle-right jumbo-arrow"
              onClick={this.goToNextSlide}
            />
          </div>
        </section>
      </div>
    );
  }
}

Jumbotron.propTypes = {
  nowPlayingMovies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  nowPlayingMovies: state.movies.nowPlaying,
  error: state.errors.favoriteError
});

export default connect(mapStateToProps)(Jumbotron);
