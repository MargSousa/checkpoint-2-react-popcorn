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
          <button className="button back-button">Back to Movies List</button>
        </Link>
      </div>
      <div className="pick-section">
        <div className="pick-poster">
          <img className="poster" src={movie.posterUrl} alt="Poster"/>
        </div>
        <div className="pick-info">
          <div className="pick-title">
            {movie.title}
            <span className="pick-year"> ({movie.year})</span>
          </div>
          <div className="pick-types">
            {movie.genres} | {movie.runtime} min
          </div>
          <div className="pick-plot">{movie.plot}</div>
          <div className="pick-staff">
            <div>
              <span className="staff">Director:</span> {movie.director}
            </div>
            <div>
              <span className="staff">Actors:</span> {movie.actors}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviePick;