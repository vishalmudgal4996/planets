import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetList: [],
    };
  }

  componentDidMount() {
    let data = null;
    let xhr = new XMLHttpRequest();
    let that = this;

    xhr.addEventListener("readystatechange", function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        that.setState({
          planetList: JSON.parse(this.responseText),
        });
        console.log(that.state.planetList);
      }
    });
    xhr.open("GET", this.props.baseUrl);
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.send(data);
  }

  render() {
    return (
      <div>
        <Header />
        Home
      </div>
    );
  }
}

export default Home;
