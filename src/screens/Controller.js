import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../screens/home/Home";

class Controller extends Component {
  constructor() {
    super();
    this.baseUrl = "https://assignment-machstatz.herokuapp.com/planet";
    this.state = {};
  }
  render() {
    return (
      <Router>
        <div className="main-container">
          <Route
            exact
            path="/planets"
            render={(props) => <Home {...props} baseUrl={this.baseUrl} />}
          />
        </div>
      </Router>
    );
  }
}

export default Controller;
