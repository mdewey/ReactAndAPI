import React, {Component} from 'react';
import './App.css';

import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';

import Weather from './Components/weather'
import api from './Components/music-api'

class App extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      needle: "phish"
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

  componentDidMount() {
    this.handleFormSubmit({
      preventDefault: () => {}
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <i className="fa fa-sun-o slow-spin fa-4x fa-fw logo" aria-hidden="true"></i>
          <h1 className="App-title">Music And Weather!</h1>
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
            <h3> Searching for <br/><span className="needle">{this.state.needle}</span></h3>
          </header>
          <section>
            {this
              .state
              .events
              .slice(0,1)
              .map((e, i) => {
                const a = moment(e.Date);
                const b = moment();

                const daysApart = a.diff(b, "days");
                console.log("days apart", daysApart);
                return (
                  <div className="event" key={i}>
                    <div className="details">
                      <div>
                      {e.Venue.Name}
                      </div>
                      <div>
                       {e.Venue.City}, {e.Venue.State}, {e.Venue.StateCode}
                      </div>
                      <div>
                        <Moment format="MMM Do, YYYY">{e.Date}</Moment>
                        <br/>
                        <em> Happening in {daysApart} days</em>
                      </div>
                    </div>
                    <div className="weather">
                      <Weather date={e.Date} happeningIn={daysApart} latitude={e.Venue.Latitude} longitude={e.Venue.Longitude}/>
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
