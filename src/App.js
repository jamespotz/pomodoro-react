import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Timer from './Timer';

class App extends Component {
  render() {
    return (
      <div className="App w-3/4 flex content-center flex-col justify-center">
        <Timer />
      </div>
    );
  }
}

export default App;
