import React from 'react';

class Weather extends React.Component {

    constructor(props) {
        super(props);
        console.log(['weather', 'ctor', props])

        this.state = {
            location: {
                lat: props.latitude,
                lng: props.longitude
            }
        };
    };

    componentDidMount = () => {
        console.log(['weather', 'mount', this.state])
        fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${this.state.location.lat}&lon=${this.state.location.lng}&appid=3061809775bb7491bd85e0a46e15e0d1`)
            .then(resp => resp.json())
            .then(json => {
                console.log("got the weather", json)
                this.setState(() => {
                    return {weather: json}
                })
            })
    }

    render() {
        console.log(['weather', 'render', this.state])
        if (this.state.weather) {
            return (
                <section>
                    <div>
                    <i className={"owf owf-"+ this.state.weather.weather[0].id}></i>
                    <span className="temp">{this.state.weather.main.temp} &#176; </span>
                    </div>
                    <em>Current Weather</em>
                </section>
            )
        } else {
            return <div className="col-md-6">
                loading...
            </div>
        }
    }
} // end of render

export default Weather