import React from 'react';
import PropTypes from 'prop-types';

import './MovieCard.css';

const MovieCard = ({
  id,
  title,
  releaseDate,
  overview,
  img,
  trailer,
  favorite
}) => {
  return (
    <div className="movie-card">
      <h1>{title}</h1>
      <p>{releaseDate}</p>
      <p>{overview}</p>
      <img src={img} alt="movie poster" width="150" />
      <i className={`star ${favorite ? 'fas fa-heart' : 'far fa-heart'}`} />
      {/* <iframe src={trailer} width="300" /> */}
    </div>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  trailer: PropTypes.string.isRequired
};

export default MovieCard;

// {"id":400155,"title":"Hotel Transylvania 3: Summer Vacation","releaseDate":"2018-06-30","overview":"Dracula, Mavis, Johnny and the rest of the Drac Pack take a vacation on a luxury Monster Cruise Ship, where Dracula falls in love with the ship's captain, Ericka, who's secretly a descendant of Abraham Van Helsing, the notorious monster slayer.","img":"http://image.tmdb.org/t/p/original/gjAFM4xhA5vyLxxKMz38ujlUfDL.jpg","trailer":"https://www.youtube.com/embed/wb49-oV0F78","favorite":false}
