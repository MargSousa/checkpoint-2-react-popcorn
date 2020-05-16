import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import MovieList from './components/MovieList';
import MoviePick from './components/MoviePick';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={MovieList} />
          <Route exact path="/movie-pick" component={MoviePick} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;

