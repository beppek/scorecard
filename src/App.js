import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Input from 'react-toolbox/lib/input';

class App extends Component {

  handleNameChange = name => {
    console.log(name);
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <Input type="text" label="Banans namn" name="name" value={this.state.name} onChange={() => handleNameChange(name)} />
        </p>
      </div>
    );
  }
}

export default App;
