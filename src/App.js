import React, { Component } from 'react';
import { Redirect, BrowserRouter, Route, Switch } from 'react-router-dom';
import "./App.css";
import Home from "./components/Home";
import Details from "./components/Details";

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <div className="ml-7">
          <Switch>

            <Route path="/" exact >
              <Redirect to="/movies" />
            </Route>
            <Route path="/movies/:movie/:movieId" component={Details} />
            <Route path="/tvshows/:tv/:tvId" component={Details} />


            <Route path="/movies" component={Home} />
            <Route path="/tvshows" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
