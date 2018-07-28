// Container Component with inputs

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchWeather } from '../actions/actions'

import WeatherInput from '../components/WeatherInput'

class WeatherFinder extends Component {

    //fetch the weather un submit, or update
    getWeather = (city) => {
        // if interval going, clear it
        if (!isNaN(this.interval)) {
            window.clearInterval(this.interval);
        }

        //get the weather data:
        const { fetchWeather } = this.props;
        fetchWeather(city);

        //set an interval for it:
        this.interval = window.setInterval(() => {
            fetchWeather(city);
        }, 65000);
    };
   

    componentWillUnmount() {
        window.clearInterval(this.interval);
    }
    
    render() {
        const { error, weatherData } = this.props
        return (
        <div className='weather-input'>
            <WeatherInput getWeather={this.getWeather} error={error} weather={weatherData} />
        </div>
        )
    }
}

WeatherFinder.propTypes = {
    fetchWeather: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    error: state.weather.error,
    weatherData: state.weather.weatherData
})

export default connect(mapStateToProps, { fetchWeather })(WeatherFinder);

