import React, { Component } from 'react'
import './app.css'
import { Provider } from 'react-redux'
import store from './store'
import WeatherFinder from './containers/WeatherFinder'
import WeatherDisplay from './containers/WeatherDisplay'

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className='app'>
            <WeatherFinder />
            <WeatherDisplay />
        </div>
      </Provider>
    )
  }
}
