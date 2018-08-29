import React from "react";
import { connect } from "react-redux";

import "./MovieCard.css";

const MovieCard = ({ movieObj, path }) => {
  const movieCard = Object.keys(movieObj).map((movieKey, index) => {
    if (path === "NowPlaying") {
      switch (movieKey) {
        case "title":
          return (
            <h1 className="movie-title" key={`${movieKey}-${index}`}>
              {movieObj[movieKey]}
            </h1>
          );

        case "img":
          return (
            <div className="movie-img" key={`${movieKey}-${index}`}>
              <img src={movieObj[movieKey]} width="300px" height="300px" />
              <button>favorite</button>
            </div>
          );

        case "favorite":
          return;

        case "id":
          return;

        case "trailer":
          return (
            <iframe
              key={`video-${index}`}
              src={movieObj[movieKey]}
              width="500"
              height="350"
            />
          );

        default:
          return (
            <div key={`${movieKey}-${index}`}>
              <p>{movieObj[movieKey]}</p>
            </div>
          );
      }
    }
  });

  return <div className="movie-card">{movieCard}</div>;
};

// const mapStateToProps = state => ({
//   todos: state.todos
// });

// const mapDispatchToProps = dispatch => ({
//   handleSubmit: (text, id) => dispatch(addTodo(text, id))
// });

export default MovieCard;
