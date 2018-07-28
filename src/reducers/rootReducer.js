import { combineReducers } from 'redux';
import weatherReducer from './weatherReducer';
import timeReducer from './timeReducer'

export default combineReducers({
    weather: weatherReducer,
    localTime: timeReducer
});