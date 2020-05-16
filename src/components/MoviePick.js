import React from 'react';
import { Link } from "react-router-dom";
import './MoviePick.css'

function MoviePick(props) {
  const { state } = props.location;
  const movie = state.getRandomMovie[0];

  console.log(movie);

  return(
    <div className="Movie-Pick">
      <div>
        <Link to="/">
          <button
            className="button back-button"
          >
            Back to Movies List
          </button>
        </Link>
      </div>
      <h1>Movie Pick</h1>
      <div>{movie.title}</div>
    </div>
  )
}

export default MoviePick;