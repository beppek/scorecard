import React, {Component} from 'react';
import { connect } from 'react-redux';
import update from 'immutability-helper';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import createHistory from "history/createBrowserHistory";

import logo from './img/discgolf.png';
import Firebase from './Firebase/Firebase';
import './App.css';

import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

import Home from "./Components/Home/Home";
import Profile from './Components/Profile/Profile';
import Course from './Components/Course/Course';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: true
    };
  }

  componentDidMount() {
    const loggingIn = localStorage.getItem("loggingIn");
    if (loggingIn) {
      Firebase
        .getRedirectResult()
        .then((result) => {
          localStorage.removeItem("loggingIn");
          // firebase.handleLoggedIn(result.user);
          localStorage.setItem("token", result.credential.accessToken);
          localStorage.setItem("username", result.user.displayName);
          this.setState({loggedIn: true, user: result.user});
        })
        .catch((error) => {
          // this.setState({loading: false});
          console.log(error);
        });
    } else {
      // this.setState({loading: false});
    }
  }

  handleSignOut = () => {
    this.setState({loggedIn: false, name: '', avatarUrl: null});
    Firebase.signout();
  }

  openLoginMenu = (e) => {
    e.preventDefault();

    this.setState({
      open: true,
      anchorEl: e.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <AppBar
            title="Scorekort"
            iconElementLeft={this.state.loggedIn
            ? <Link to="/profile"> <Avatar className="App-logo" src={this.state.user.photoURL} /> </Link>
            : <img src={logo} className="App-logo" alt="logo" /> }
            iconElementRight={this.state.loggedIn
            ? <FlatButton
                onClick={this.handleSignOut}
                label="Logga ut"
                secondary={true}
                icon={< FontIcon className = "fa fa-sign-out" />}/>
            : <FlatButton
                  onClick={this.openLoginMenu}
                  label="Logga in"
                  secondary={true}
                  icon={< FontIcon className = "fa fa-sign-in" />}/>
  }
          />
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <Menu>
              <MenuItem leftIcon={<FontIcon className="fa fa-google" />} primaryText="Google" onClick={Firebase.signInWithGoogle} />
              <MenuItem leftIcon={<FontIcon className="fa fa-facebook" />} primaryText="Facebook" />
              <MenuItem leftIcon={<FontIcon className="fa fa-twitter" />} primaryText="Twitter" />
              <MenuItem leftIcon={<FontIcon className="fa fa-instagram" />} primaryText="Instagram" />
            </Menu>
          </Popover>
          <div className="content">
            <Route path="/home" component={() => <Home courses={this.props.courses} />} />
            <Route path="/profile" component={() => <Profile />} />
            <Route path="/courses/:course" component={(props) => <Course {...props} {...this.props} />} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    courses: state.courses.courses
  }
}

export default connect(mapStateToProps)(App);
