// Presentational component with inputs
import React, { Component } from 'react'
import { Button, Icon, Input } from 'react-materialize'
import { isEmpty } from '../constants/constants'

class WeatherInput extends Component {
    state = {
        city: ''
    }

    handleChange = (e) => {
        this.setState({
            city: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.city)
        this.props.getWeather(this.state.city)

        //set city back to empy string
        this.setState({
            city: ''
        });
    }

    render() {
        const { weather } = this.props
        return (
          <div style={{textAlign: 'center'}}>
            <h1 className='app-title'>LOCAL <span style={{color: '#f95151'}}>WEATHER</span></h1>  
            {isEmpty(weather) ?
                <h2 className='input-title'>Please Enter a City</h2> :
                <h2 className='input-title'>City Located</h2>}
            
            <form onSubmit={this.handleSubmit}>
                <Input
                  placeholder='City name...'
                  onChange={this.handleChange}
                  value={this.state.city}
                >
                   <Icon>add_location</Icon>
                </Input>

                <Button waves='light' className='btn red accent-2' type='submit'>
                    <Icon right>send</Icon>Get Weather
                </Button>   
            </form>  
          </div> 
        )
    }
}

export default WeatherInput