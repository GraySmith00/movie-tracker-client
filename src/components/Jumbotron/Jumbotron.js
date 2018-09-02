import React from 'react';
import './Jumbotron.css';

const Jumbotron = () => {
  return (
    <div
      className="jumbotron"
      style={{
        backgroundImage:
          'url(' + require(`../../images/jumbotron/345940.jpg`) + ')'
      }}
    />
  );
};

export default Jumbotron;
