import React, { Component } from 'react';
import logo from './img/discgolf.png';
import Firebase from './Firebase/Firebase';

import './App.css';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loggedIn: false,
      avatarUrl: null
    };
  }

  componentDidMount() {
    const loggingIn = localStorage.getItem("loggingIn");
    if (loggingIn) {
      Firebase.getRedirectResult().then((result) => {
        localStorage.removeItem("loggingIn");
        // firebase.handleLoggedIn(result.user);
        localStorage.setItem("token", result.credential.accessToken);
        localStorage.setItem("username", result.user.displayName);
        this.setState({
          loggedIn: true,
          username: result.user.displayName,
          avatarUrl: result.user.photoURL
        });
      })
      .catch((error) => {
        // this.setState({loading: false});
        console.log(error);
      });
    } else {
      // this.setState({loading: false});
    }
  }

  handleNameChange = (e, name) => {
    console.log(name);
    this.setState({
      name
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log(`Saving course: ${this.state.name}`);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          { this.state.loggedIn ? <Avatar className="App-logo" src={this.state.avatarUrl} /> :
            <img src={logo} className="App-logo" alt="logo" />
          }
          <h2>Scorekort {this.state.loggedIn ? ` för ${this.state.username}` : ""}</h2>
        </div>
        <RaisedButton
          onClick={Firebase.signInWithGoogle}
          label="Logga in med Google"
          secondary={true}
          icon={<FontIcon className="fa fa-google" />}
        />
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField type="text" floatingLabelText="Banans namn" name="name" onChange={(e, value) => this.handleNameChange(e, value)} />
        </form>
      </div>
    );
  }
}

export default App;
