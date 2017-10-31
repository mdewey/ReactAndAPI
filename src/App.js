import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      events: []
    };
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log("submitted", evt, this.state);
  }


  handleArtChange = (evt) => {
    console.log("text changed!", evt.target.value, this.state);
    var needle = evt.target.value;
    this.setState(() => {
      return {
        needle
      }
    })
  }



  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React & APIs!!!</h1>
        </header>
        <div className="App-intro">
          <header>
            <form onSubmit={evt => this.handleFormSubmit(evt)}>
              <input
                type="text"
                placeholder="search for an artist"
                onChange={evt => this.handleArtChange(evt)}/>
            </form>
          </header>
        </div>
      </div>
    );
  }
}

export default App;
