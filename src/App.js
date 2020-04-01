import React, { Component } from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import Home from "./components/Home";
import Details from "./components/Details";
import TvDetails from "./components/TvDetails";
import Navbar from "./components/Navbar";
import SearchResults from "./components/SearchResults";

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Route path="/" component={Navbar} />
        <div className="ml-7">
          <Switch>

            <Route path="/" exact >
              <Redirect to="/movies" />
            </Route>
            <Route path="/movies/:movie/:movieId" component={Details} />
            <Route path="/tvshows/:tv/:tvId" component={TvDetails} />
            <Route path="/search" component={SearchResults} />


            <Route path="/movies" component={Home} />
            <Route path="/tvshows" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
