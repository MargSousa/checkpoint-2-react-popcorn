import React from 'react';
import './Movie.css'
import starIcon from '../assets/star.png';

function Movie(props) {

  const { id, title, year } = props.movie; 
  const { movie, handleFavourite, favourite } = props; 

  return(
    <div className="Movie">
        { favourite ? 
          <div className="movie-section">
            <div className="movie-info">
            <img className="star-icon" src={starIcon} alt="star"/>
            {title}
            </div>
            <div>
              <button 
              id={id}
              value="remove"
              className="button remove-button"
              onClick={(event) => handleFavourite(event, movie)}
              >
                Remove from Favourites
              </button>
            </div>
          </div>
        : 
        <div className="movie-section">
          <div className="movie-info">
            <span className="movie-id">{id}. </span>
            {title}
            <span className="movie-year"> ({year})</span> 
          </div>
          <div>
            <button 
            id={id}
            value="add"
            className="button add-button"
            onClick={(event) => handleFavourite(event, movie)}
            >
              Add to Favourites
            </button>
          </div>
        </div>
        }
      </div>
  )
}

export default Movie;
