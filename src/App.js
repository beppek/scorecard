import React, { Component } from "react";
import { connect } from "react-redux";
import update from "immutability-helper";
import { Router, Route, Link, Redirect } from "react-router-dom";
import history from "./history";

import logo from "./golfer.svg";
import Firebase from "./Firebase/Firebase";
import "./App.css";

import AppBar from "material-ui/AppBar";
import MenuItem from "material-ui/MenuItem";
import Popover from "material-ui/Popover";
import Menu from "material-ui/Menu";
import FlatButton from "material-ui/FlatButton";
import FontIcon from "material-ui/FontIcon";
import Avatar from "material-ui/Avatar";
import Paper from "material-ui/Paper";
import {
  BottomNavigation,
  BottomNavigationItem
} from "material-ui/BottomNavigation";

import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import RoundScore from "./Components/Profile/RoundScore";
import Course from "./Components/Course/Course";
import CreateRound from "./Components/Round/CreateRound";
import Round from "./Components/Round/Round";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount() {
    const loggingIn = localStorage.getItem("loggingIn");
    if (loggingIn) {
      Firebase.getRedirectResult()
        .then(result => {
          localStorage.removeItem("loggingIn");
          localStorage.setItem("token", result.credential.accessToken);
          localStorage.setItem("username", result.user.displayName);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  handleSignOut = () => {
    Firebase.signout();
  };

  openLoginMenu = e => {
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <AppBar
            onTitleTouchTap={() => history.push("/home")}
            title="Scorekort"
            iconElementLeft={
              this.props.loggedIn ? (
                <Link to="/profile">
                  {" "}
                  <Avatar
                    className="App-logo"
                    src={this.props.user.photoURL}
                  />{" "}
                </Link>
              ) : (
                <img src={logo} className="App-logo" alt="logo" />
              )
            }
            iconElementRight={
              this.props.loggedIn ? (
                <FlatButton
                  onClick={this.handleSignOut}
                  label="Logga ut"
                  secondary={true}
                  icon={<FontIcon className="fa fa-sign-out" />}
                />
              ) : (
                <FlatButton
                  onClick={this.openLoginMenu}
                  label="Logga in"
                  secondary={true}
                  icon={<FontIcon className="fa fa-sign-in" />}
                />
              )
            }
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
            targetOrigin={{ horizontal: "left", vertical: "top" }}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem
                leftIcon={<FontIcon className="fa fa-google" />}
                primaryText="Google"
                onClick={Firebase.signInWithGoogle}
              />
              <MenuItem
                leftIcon={<FontIcon className="fa fa-facebook" />}
                primaryText="Facebook"
              />
              <MenuItem
                leftIcon={<FontIcon className="fa fa-twitter" />}
                primaryText="Twitter"
              />
              <MenuItem
                leftIcon={<FontIcon className="fa fa-instagram" />}
                primaryText="Instagram"
              />
            </Menu>
          </Popover>
          <div className="content">
            <Route
              path="/home"
              component={() => <Home courses={this.props.courses} />}
            />
            <Route exact path="/profile" component={() => <Profile />} />
            <Route
              exact
              path="/profile/scores/:roundId"
              component={props => <RoundScore {...props} {...this.props} />}
            />
            <Route
              exact
              path="/courses/:course"
              component={props => <Course {...props} {...this.props} />}
            />
            <Route
              exact
              path="/courses/:course/rounds"
              component={props => <CreateRound {...props} {...this.props} />}
            />
            <Route
              exact
              path="/courses/:course/rounds/:roundId"
              component={props => <Round {...props} {...this.props} />}
            />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </div>
          <Paper className="bottom-nav" zDepth={1}>
            <BottomNavigation>
              <BottomNavigationItem
                onClick={() => history.push("/home")}
                icon={<FontIcon className="fa fa-home" />}
              />
              <BottomNavigationItem
                onClick={() => history.goBack()}
                icon={<FontIcon className="fa fa-arrow-left" />}
              />
            </BottomNavigation>
          </Paper>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.courses.courses,
    loggedIn: state.courses.loggedIn,
    user: state.courses.user
  };
};

export default connect(mapStateToProps)(App);
