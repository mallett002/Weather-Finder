// Presentational Component displaying current weather

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Icon } from 'react-materialize'

// Constants
import { 
    isEmpty, 
    getImage, 
    getNightImage,
    getAmOrPm, 
    getLocalHours,
    toCelsius,
    isNight,
    getWind,
    getTagline,
    getNightTag
} from '../constants/constants'

// Components
import Conditions from './Conditions'
import Tagline from './Tagline'
import Loading from './Loading'

// Images
import description from '../images/description.png'
import sky from '../images/sky.png'
import wind from '../images/wind.png'


class CurrentWeather extends Component {
    state = {
        isCelsius: false
    }

    handleFahrenheit = () => {
        this.setState({ isCelsius: !this.state.isCelsius});
    }

    render() {
        const { error, weatherData, localTime, loadingTime } = this.props;
        console.log('localData: ', localTime);
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

        // description for the tagline
        const main = !isEmpty(weatherData) && weatherData.weather[0].description;
        const tagline = (description) => {
            if(!isEmpty(weatherData)) {
                if(night) {
                    return getNightTag(description);
                } else {
                    return getTagline(description);
                }  
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
        if (loadingTime === true ) {
            return <div className='loader-wrapper'>
               <Loading />
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
                {/*Container for time and Fahrenheight/Cels button*/}
                <div className='time-button-wrapper'>
                
                    {/*----Show time here for larger screens------*/}
                    <div className='lrg-screen-time'>
                        {!localTime.formatted ?
                        <p style={{fontSize: '1.5em'}}>Retrieving time...</p>: 
                        <h1>{`${getLocalHours(formatted)}:${getLocalMin(minutes)} ${getAmOrPm(formatted)}`}</h1>}
                    </div>

                    {/*----Button for Fahrenheit & Celsius-----*/}
                    <div className='btn-wrapper'>
                        <Button
                            className='btn grey darken-4 cels-fahr'
                            waves='light'
                            onClick={this.handleFahrenheit}
                        >
                            {isCelsius ? 'Fahrenheit':
                            'Celsius'}<Icon right>autorenew</Icon>
                        </Button>
                    </div>
                </div>
                
                {/*----City Name and Country-----*/}
                <div className='city-wrapper'>
                    <h1 className='city-name'>{weatherData.name},</h1>
                    {!localTime.countryName ? <p style={{fontSize: '1.5em'}}>Retrieving country...</p>:
                    <h1 className='country-name'>{localTime.countryName}</h1>}
                </div>

                {/*-----Current Temperature-----*/}
                <div className='temp-wrapper' style={{textAlign: 'center'}}>
                    <h2 className='temp'>{!isCelsius ? `${Math.floor(weatherData.main.temp)} F`: 
                    `${Math.floor(toCelsius(weatherData.main.temp))} C`}</h2>
                </div>

                {/*------Local Time for Small Screens------*/}
                <div className='sml-screen-time'>
                    {!localTime.formatted ?
                    <p style={{fontSize: '1.5em'}}>Retrieving time...</p>: 
                    <h1 className='time'>{`${getLocalHours(formatted)}:${getLocalMin(minutes)} ${getAmOrPm(formatted)}`}</h1>}
                </div>

                {/* ------Conditions Container -------*/}
                <div className='conditions-wrapper'>

                    {/*----Current Conditions Title-----*/}
                    <div className='conditions-title' style={{textAlign:'center'}}>
                        <h4>Current Conditions</h4>
                    </div>

                    {/*----Current Conditions Div-----*/}
                    <div className='conditions-container'>
                        <Conditions 
                            title='DESCRIPTION'
                            description={weatherData.weather[0].description}
                            weather={weatherData}
                            url={iconURL}
                            icon={description}
                        />
                        <Conditions 
                            title='CLOUDS'
                            weather={weatherData}
                            icon={sky}
                        />
                        <Conditions 
                            title='WIND'
                            wind={getWind(weatherData.wind.speed, weatherData.wind.deg)}
                            icon={wind}
                        />
                    </div>
                </div>
                <Tagline 
                    tagline={tagline(main)}
                />
        </div>
        )
    }
}


CurrentWeather.propTypes = {
    weatherData: PropTypes.object.isRequired,
    localTime: PropTypes.object.isRequired,
    error: PropTypes.bool,
    loadingTime: PropTypes.bool.isRequired
}


export default CurrentWeather
