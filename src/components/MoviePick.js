import React from 'react';
import './MoviePick.css'

function MoviePick(props) {
  const { location } = props;
  const movie = location.state;

  console.log(movie);

  return(
    <div className="Movie-Pick">
      <h1>Movie Pick</h1>
      
    </div>
  )
}

export default MoviePick;
