import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Moment from 'react-moment';
import 'moment-timezone';

import Weather from './Components/weather'
import api from './Components/music-api'

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
    const callback = (json) => this.setState(() => {
      return {events: json.Events}
    })
    api.getData(this.state.needle, callback);

  }

  handleArtChange = (evt) => {
    console.log("text changed!", evt.target.value, this.state);
    var needle = evt.target.value;
    this.setState(() => {
      return {needle}
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React & APIs!!!</h1>
        </header>
        <br/>
        <div className="App-intro">
          <header>
            <form onSubmit={evt => this.handleFormSubmit(evt)}>
              <input
                type="text"
                placeholder="search for an artist"
                autoFocus="autoFocus"
                onChange={evt => this.handleArtChange(evt)}/>
            </form>
          </header>
          <section>
            {this
              .state
              .events
              .map((e, i) => {
                return (
                  <div className="event" key={i}>
                    <div>
                      <Moment format="MMM">{e.Date}</Moment>
                      <Moment format="Do">{e.Date}</Moment>
                      <Moment format="YYYY">{e.Date}</Moment>
                    </div>
                    <div>
                      <div>
                        Venue: {e.Venue.Name}
                      </div>
                      <div>
                        City: {e.Venue.City}, {e.Venue.State}, {e.Venue.StateCode}
                      </div>
                    </div>
                    <div>
                      <Weather latitude={e.Venue.Latitude} longitude={e.Venue.Longitude}/>
                    </div>
                  </div>
                )
              })}
          </section>
        </div>
      </div>
    );
  }
}

export default App;
