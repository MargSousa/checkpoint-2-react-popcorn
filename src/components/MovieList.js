import React from 'react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import Movie from './Movie';
import './MovieList.css'

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      genres: [],
      favouriteMovies: [],
      randomMovie: [],
      isFilterOn: false,
      filterSelected: "",
    }
  }

  componentDidMount = () => {
    const url = `https://raw.githubusercontent.com/wildcodeschoolparis/datas/master/movies.json`;
    axios.get(url)
    .then( response => {
      const getMovies = response.data.movies;
      const getGenres = response.data.genres;
      this.setState({ 
        movies: getMovies,
        genres: getGenres
      })
    })
    const getFav = JSON.parse(localStorage.getItem("favList"));
    if (getFav) {
      this.setState({ 
        favouriteMovies: getFav,
      })
    }
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
    localStorage.setItem('favList', JSON.stringify(favourites));
  }

  getRandomMovie = () => {
    const { favouriteMovies } = this.state;
    let idLength = favouriteMovies.map(movie => movie.id).length;
    let idIndex = Math.floor(Math.random() * idLength);    
    let getRandomMovie = favouriteMovies.filter(movie => movie.id === favouriteMovies[idIndex].id)

    this.setState({ randomMovie: getRandomMovie })

    this.props.history.push({
      pathname: '/movie-pick',
      state: { getRandomMovie, favouriteMovies: favouriteMovies }
    });
  }

  handleFilter = (event) => {
    let filter = event.target.value;
    let filterMode = true;
    if(!filter) {
      filterMode = false;
    }
    this.setState({ 
      filterSelected: filter,
      isFilterOn: filterMode 
    })
  }

  render() {
    const { movies, genres, favouriteMovies, filterSelected, isFilterOn } = this.state;
    
    return(
      <div className="Movie-List">
        <div className="main-title">Movies</div>
        <div className="fav-title">Favourites List</div>
        { favouriteMovies.length ? 
          <div className="fav-list">
            { favouriteMovies.map( movie =>
              <Movie key={movie.id} movie={movie} handleFavourite={this.handleFavourite} favourite/>
            )}
            <div className="pick">
                <button
                  onClick={this.getRandomMovie}
                  value="pick"
                  className="button pick-button"
                >
                  Pick random favorite
                </button>
            </div>
          </div> : 
          <div className="favourites"> No Favourites movies added...</div>
        }
        <div className="movies-title">Movies List</div>
        <div className="movies-filter">
          <label>Filter by movie genre: </label>
          <select onChange={this.handleFilter}>
            <option value="">All </option>
            { genres.map( genre => <option value={genre}>{genre}</option> )}
          </select>
        </div>
        <div className="list">
          { movies
          .filter(
            (movie) => !isFilterOn || movie.genres.includes(filterSelected))
          .map( movie => 
            <Movie key={movie.id} movie={movie} handleFavourite={this.handleFavourite}/>
          )}
        </div>
      </div>
    )
  }
}

export default withRouter(MovieList);