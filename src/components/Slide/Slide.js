import React from 'react';
import PropTypes from 'prop-types';
import StarRatingComponent from 'react-star-rating-component';

import './Slide.css';

const Slide = ({ movie }) => {
  const { title, movie_id, release_date, vote_average } = movie;
  return (
    <div
      className="slide"
      style={{
        backgroundImage:
          'url(' + require(`../../images/jumbotron/${movie_id}.jpg`) + ')'
      }}
    >
      <div className="jumbotron-overlay">
        <div className="inner-content">
          <div className="jumbo-text-container">
            <h1>{title}</h1>
            <p className="jumbo-overview">{movie.overview}</p>
            <p className="jumbo-release-date">{`Released on ${release_date}`}</p>
            <div className="star-rating">
              <StarRatingComponent
                name="rate2"
                editing={false}
                renderStarIcon={() => <span>★</span>}
                starCount={10}
                value={vote_average}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Slide.propTypes = {
  movie: PropTypes.object.isRequired
};

export default Slide;
