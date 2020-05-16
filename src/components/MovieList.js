import React from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from 'axios';
import Movie from './Movie';
import './MovieList.css'

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favouriteMovies: [],
      randomMovie: []
    }
  }

  componentDidMount = () => {
    let url = `https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json`;
    axios.get(url)
    .then( response => response.data )
    .then( moviesData => {
      let getMovies = moviesData.movies
      this.setState({ movies: getMovies })
    })
  }

  handleFavourite = (event, movie) => {
    const { value } = event.target
    let favourites = this.state.favouriteMovies;
    const newId = movie.id;

    if ( value === 'add') {
      let movies = favourites.some(movie => movie.id === newId);
      if(!movies) {
        favourites.push(movie)
      }
    } else {
      favourites = favourites.filter(movie => movie.id !== newId);
    } 
    this.setState({ favouriteMovies: favourites})
  }

  getRandomMovie = () => {
    const { history } = this.props;
    const { movies } = this.state;
    const number = Math.floor(Math.random() * 147);
    let getRandomMovie = movies.filter(movie => movie.id === number)
    
    history.push({
      pathname: '/movie-pick',
      state: { detail: getRandomMovie }
    });

    this.setState({ randomMovie: getRandomMovie })
  }

  render() {
    const { movies, favouriteMovies } = this.state;

    return(
      <div className="Movie-List">

        <div className="list-title">Movies List:</div>
        { favouriteMovies.length ? 
          <div>
            { favouriteMovies.map( movie =>
              <Movie key={movie.id} movie={movie} handleFavourite={this.handleFavourite} favourite/>
            )}
            <div className="pick-section">
              <Link to="/movie-pick">
                <button
                  onClick={this.getRandomMovie}
                  value="pick"
                  className="button pick-button"
                >
                  Pick
                </button>
              </Link>
            </div>
          </div> : 
          <div className="favourites"> No Favourites movies added...</div>
        }
        <div className="list">
          { movies.map( movie => 
            <Movie key={movie.id} movie={movie} handleFavourite={this.handleFavourite}/>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(MovieList);