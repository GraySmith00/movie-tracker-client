import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

import './Jumbotron.css';
import { connect } from 'react-redux';

const Jumbotron = ({ nowPlayingMovies }) => {
  const jumboMovies = nowPlayingMovies.slice(0, 1);

  return (
    <div
      className="jumbotron"
      style={{
        backgroundImage:
          'url(' + require(`../../images/jumbotron/345940.jpg`) + ')'
      }}
    >
      <div className="jumbotron-overlay">
        <div className="inner-content">
          <div className="jumbo-text-container">
            <h1>The Meg</h1>
            <p className="jumbo-overview">
              A deep sea submersible pilot revisits his past fears in the
              Mariana Trench, and accidentally unleashes the seventy foot
              ancestor of the Great White Shark believed to be extinct.
            </p>
            <p className="jumbo-release-date">Released on 2018-06-07</p>
            <div style={{ fontSize: '24px' }}>
              <StarRatingComponent
                name="rate2"
                editing={false}
                renderStarIcon={() => <span>★</span>}
                starCount={10}
                value={5}
              />
            </div>
          </div>
          <section className="arrow-icons-container">
            <div className="backArrow">
              <i className="fas fa-angle-left jumbo-arrow" />
            </div>
            <div className="nextArrow">
              <i className="fas fa-angle-right jumbo-arrow" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  nowPlayingMovies: state.movies.nowPlaying
});

export default connect(mapStateToProps)(Jumbotron);
