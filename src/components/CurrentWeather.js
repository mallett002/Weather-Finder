// Presentational Component displaying current weather

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'react-materialize'
import { 
    isEmpty, 
    getImage, 
    getNightImage,
    getAmOrPm, 
    getLocalHours,
    toCelsius,
    isNight,
    getWind
} from '../constants/constants'

class CurrentWeather extends Component {
    state = {
        isCelsius: false
    }

    handleFahrenheit = () => {
        this.setState({ isCelsius: !this.state.isCelsius});
    }

    render() {
        const { error, weatherData, localTime, loading } = this.props;
        const local = new Date(localTime.timestamp * 1000);
        const formatted = localTime.formatted;
        const { isCelsius } = this.state;

        //obtain current mins: (add 0 if less than 10)
        let minutes = local.getMinutes();
        const getLocalMin = min => {
            return min < 10 ? `0${min}`: min;
        }

        //get image 
        const night = isNight(formatted); // true or false
        console.log('is night ?: ', night);

        const image = (weather) => {
            if(!isEmpty(weather)) {
                if(night) {
                    return getNightImage(weatherData.weather[0].description);
                } else {
                    return getImage(weatherData.weather[0].description);
                }  
            }
        }
        

        //icon
        const icon = !isEmpty(weatherData) && weatherData.weather[0].icon;
        const iconURL = `http://openweathermap.org/img/w/${icon}.png`;

        //image backgrounds
        const backgrounds = {
            noCity: { background: 'white' },
            city: { 
                // if weather in state is not empty, call getImage with discription
                background: !isEmpty(weatherData) && `url(${image(weatherData)})`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeate: 'no-repeate'
            }
        }

        //if there is an error, display it
        if (error !== null) {
            return <div style={{textAlign: 'center', color:'rgba(0,0,0,0.87)', marginTop: '5em'}}>
                    <h3>{error.message}!</h3>
                    <h5>Make sure your spelling is correct.</h5>
                </div>
        }

        if (isEmpty(weatherData)) {
            return (
                <div className='empty-weather'>
                    <h4 className='no-city'>No City Located</h4>
                    <p>Enter a city to get current weather</p>
                </div>
            )
        }

        // while both API requests haven't returned:
        if (loading) {
            return <div style={{textAlign: 'center'}}>
                <h1 style={{color: 'rgb(33, 33, 33)', marginTop: '3em'}}>Loading...</h1>
            </div>
        }

        // Once request comes:
        return (
        <div className='located-city-display' 
            style={
            isEmpty(weatherData) ?
                {...backgrounds.noCity} :
                {...backgrounds.city}
        }>
            <div>
                <div className='btn-wrapper'>
                    <Button
                    className='btn cels-fahr'
                    onClick={this.handleFahrenheit}
                    >
                        {isCelsius ? 'To Farenheit':
                        'To Celsius'}<Icon right>autorenew</Icon>
                    </Button>
                </div>
                
                <div className='city-wrapper'>
                    <h1>{weatherData.name}</h1>
                </div>
                
                <h1>{!isCelsius ? `${Math.floor(weatherData.main.temp)} F`: 
                `${Math.floor(toCelsius(weatherData.main.temp))} C`}</h1>

                <div className='weather-details'>
                    <p>{weatherData.weather[0].description}</p>
                    <img src={iconURL} alt='current conditions' />
                    <p>The sky is {weatherData.clouds.all}% cloudy</p>
                    <p>{getWind(weatherData.wind.speed, weatherData.wind.deg)}</p>
                </div>

                {/* When localTime comes back, show time */}
                {!localTime.formatted ?
                <h1>Getting time...</h1>: 
                <h1>{`${getLocalHours(formatted)}:${getLocalMin(minutes)} ${getAmOrPm(formatted)}`}</h1>}
            </div>
        </div>
        )
    }
}

CurrentWeather.propTypes = {
    weatherData: PropTypes.object.isRequired,
    localTime: PropTypes.object.isRequired
}


export default CurrentWeather
