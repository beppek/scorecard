import React, {Component} from 'react';
import logo from './img/discgolf.png';
import Firebase from './Firebase/Firebase';
import update from 'immutability-helper';

import './App.css';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Paper from 'material-ui/Paper';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loggedIn: false,
      avatarUrl: null,
      courses: [],
      loading: true,
      results: [],
      value: null
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
          this.setState({loggedIn: true, username: result.user.displayName, avatarUrl: result.user.photoURL});
        })
        .catch((error) => {
          // this.setState({loading: false});
          console.log(error);
        });
    } else {
      // this.setState({loading: false});
    }

    Firebase
      .getAllCourses()
      .then((courses) => {
        this.setState({courses});
      });
  }

  handleNameChange = (name) => {
    let results = [];
    let courses = this.state.courses;
    if (name !== "") {
      courses.forEach((course) => {
        if (course.value.title.toLowerCase().includes(name.toLowerCase())) {
          results.push(course);
        }
      });
    } else {
      results = [];
    }
    this.setState({results, value: name});
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(`Saving course: ${this.state.name}`);
  }

  handleSignOut = () => {
    this.setState({loggedIn: false, name: '', avatarUrl: null});
    Firebase.signout();
  }

  removeFromList = (e, result) => {
    e.preventDefault();
    e.stopPropagation();
    const i = this
      .state
      .results
      .indexOf(result);
    this.setState((prevState) => ({
      results: update(prevState.results, {
        $splice: [
          [i, 1]
        ]
      })
    }));
  }

  selectCourse = (e, course) => {
    e.preventDefault();
    console.log(course);
  }

  clearInput = () => {
    this.setState({value: null});
    this.handleNameChange("");
  }

  openLoginMenu = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    let listItems = [];
    const results = this.state.results.length > 0
      ? this.state.results
      : this.state.courses;
    results.forEach(result => {
      listItems.push(
        <ListItem
          onClick={(e) => this.selectCourse(e, result)}
          key={result.key}
          primaryText={result.value.title}
          leftAvatar={< Avatar src = {
          result.value.logo
        } />}
          rightIcon={< FontIcon className = "fa fa-times" onClick = {
          (e) => this.removeFromList(e, result)
        } />}/>
      );
    });
    return (
      <div className="App">
        <AppBar
          title="Scorekort"
          iconElementLeft={this.state.loggedIn
          ? <Avatar className="App-logo" src={this.state.avatarUrl} /> 
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
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <TextField
              value={this.state.value
              ? this.state.value
              : ""}
              type="text"
              floatingLabelText="Vilken bana ska du spela på?"
              name="name"
              onChange={(e, value) => this.handleNameChange(value)}/>
            <FontIcon
              onClick={this.clearInput}
              style={{
              color: "#666",
              cursor: "pointer"
            }}
              className="fa fa-times"/>
          </form>
          <Paper
            style={{
            width: 300,
            margin: "0 auto"
          }}
            zDepth={1}>
            {this.state.results.length > 0 && <List>
              {listItems}
            </List>
  }
          </Paper>
        </div>
      </div>
    );
  }
}

export default App;
