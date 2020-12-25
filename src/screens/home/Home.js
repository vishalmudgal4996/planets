import React, { Component } from "react";
import Header from "../../common/header/Header";
import "./Home.css";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarIcon from "@material-ui/icons/Star";

const styles = (theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridListMain: {
    transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
});

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

  planetClickHandler = (planetId) => {
    let planetData = this.state.planetList;

    let objIndex = planetData.findIndex((obj) => obj.id === planetId);

    if (planetData[objIndex].isFavourite === true) {
      planetData[objIndex].isFavourite = false;
    } else {
      planetData[objIndex].isFavourite = true;
    }

    console.log(planetData);

    this.setState({ planetList: planetData });
  };

  render() {
    const { classes } = this.props;
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
          <div className="left">
            <GridList
              cellHeight={150}
              cols={4}
              className={classes.gridListMain}
            >
              {this.state.planetList.map((id) => (
                <GridListTile
                  key={"grid" + id.id}
                  className="planets-grid-item"
                >
                  <img
                    src="https://cdn.mos.cms.futurecdn.net/nGUneraFwt2iCnuu2iSWFf.jpg"
                    alt={id.id}
                  />
                  <GridListTileBar
                    title={id.name}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                    }}
                    actionIcon={
                      <IconButton
                        aria-label={`info about ${id.id}`}
                        onClick={() => this.planetClickHandler(id.id)}
                      >
                        {id.isFavourite === false ? (
                          <StarBorderIcon className={classes.title} />
                        ) : (
                          <StarIcon color="primary" />
                        )}
                      </IconButton>
                    }
                  ></GridListTileBar>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Fav Planets details
        </TabPanel>
      </div>
    );
  }
}

export default withStyles(styles)(Home);
