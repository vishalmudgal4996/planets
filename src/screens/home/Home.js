import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Typography>{children}</Typography>}
    </div>
  );
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      planetList: [],
      value: 0,
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

  handleChange = (event, val) => {
    this.setState({ value: val });
  };

  render() {
    return (
      <div>
        <Header />
        <AppBar position="static">
          <Tabs
            value={this.state.value}
            aria-label="simple tabs example"
            centered
            onChange={this.handleChange}
          >
            <Tab label="All Planets" />
            <Tab label="Fav Planets" />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.value} index={0}>
          All Planets details
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Fav Planets details
        </TabPanel>
      </div>
    );
  }
}

export default Home;
