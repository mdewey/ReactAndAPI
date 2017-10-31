import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import Moment from 'react-moment';
import 'moment-timezone';

import Weather from './Components/weather'

class App extends Component {

  constructor() {
    super();
    this.state = {
      events: [], 
      mapkey :"arpaxgvgu69s3ryc8bx4apsb"
    };
  }

  handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log("submitted", evt, this.state);
    fetch(`http://api.jambase.com/artists?name=${this.state.needle}&page=0&api_key=${this.state.mapkey}`)
      .then(resp => resp.json())
      .then(json => {
        console.log("back", json)
        if (json.Artists.length) {
          const artistId = json.Artists[0].Id
          console.log("searching for artist", artistId);
          return fetch(`http://api.jambase.com/events?artistId=${artistId}&page=0&api_key=${this.state.mapkey}`)
        }
      })
      .then(resp => resp.json())
      .then(json => {
        console.log("back again", json)
        this.setState(() => {
          return {events: json.Events}
        })
      });
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
            {this.state.events.map((e, i) => {
              return (
                <div className="event" key={i}>
                  {e.Venue.Name} @ 
                  <Moment format="M/D/YY">{e.Date}</Moment> 
                  <Weather latitude={e.Venue.Latitude} longitude={e.Venue.Longitude}/>
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
