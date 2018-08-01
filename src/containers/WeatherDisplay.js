// Container component for displaying weather

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import CurrentWeather from '../components/CurrentWeather'

class WeatherDisplay extends Component {

    render() {
        const { weatherData, localTime, error, loadingTime } = this.props
        return (
        <div className='current-weather'>
            <CurrentWeather 
              loadingTime={loadingTime} localTime={localTime} 
              error={error} weatherData={weatherData} />
        </div>
        )
    }
}

WeatherDisplay.propTypes = {
    weatherData: PropTypes.object.isRequired,
    localTime: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    weatherData: state.weather.weatherData,
    localTime: state.localTime.localTime,
    loadingTime: state.localTime.loadingTime,
    error: state.weather.error,
})

export default connect(mapStateToProps)(WeatherDisplay)