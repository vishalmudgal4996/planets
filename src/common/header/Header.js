import React, { Component } from "react";
import "./Header.css";
import Typography from "@material-ui/core/Typography";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <header className="app-header">
          <Typography variant="h6" gutterBottom>
            Planets
          </Typography>
        </header>
      </div>
    );
  }
}

export default Header;
