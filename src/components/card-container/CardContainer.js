import React from "react";
import MovieCard from "../movie-card/MovieCard";

const CardContainer = ({ data, path }) => {
  const cardContainer = data.map((movieObj, index) => (
    <MovieCard key={`Container-${index}`} movieObj={movieObj} path={path} />
  ));
  return <div> {cardContainer}</div>;
};

export default CardContainer;
