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

    getWeatherData = (lat, lon) => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${lon}&appid=3061809775bb7491bd85e0a46e15e0d1`)
            .then(resp => resp.json())
            .then(json => {
                console.log("got the weather", json)
                this.setState(() => {
                    return {
                        weather: json,
                        location: {
                            lat: lat,
                            lng: lon
                        }
                    }
                })
            })
    }

    componentWillReceiveProps = (nextProps) => {
        console.log(['weather', 'new props', nextProps])
        const lat = nextProps.latitude;
        const lon = nextProps.longitude;
        this.getWeatherData(lat, lon)

    }

    componentDidMount = () => {
        console.log(['weather', 'mount', this.state.location])
        this.getWeatherData(this.state.location.lat, this.state.location.lng)
    }

    render() {
        console.log(['weather', 'render', this.state])
        if (this.state.weather) {
            return (
                <section>
                    <div>
                        <i className={"owf owf-" + this.state.weather.weather[0].id}></i>
                        <span className="temp">{this.state.weather.main.temp}
                            &#176;
                        </span>
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