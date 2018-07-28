
import { 
    FETCH_WEATHER_BEGIN,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
    GET_INITIAL_STATE,
    GET_TIME
} from './actionTypes'


/* Shape of State
{
    loading: false,
    weatherData: {},
    localTime: 0,
    error: null
}
*/
// restart
export const fetchWeatherRestart = () => ({
    type: GET_INITIAL_STATE
})

// Begin
export const fetchWeatherBegin = () => ({
    type: FETCH_WEATHER_BEGIN
});

// Success
export const fetchWeatherSuccess = (weather) => ({
    type: FETCH_WEATHER_SUCCESS,
    payload: { weather }
});

// Failure
export const fetchWeatherFailure = (error) => ({
    type: FETCH_WEATHER_FAILURE,
    payload: { error }
});

export const fetchLocalTime = (lat, lng) => dispatch => {
    fetch(`http://api.timezonedb.com/v2/get-time-zone?key=ICX1EE0NGQM3&format=json&by=position&lat=${lat}&lng=${lng}`)
        .then(handleErrors)
        .then(res => res.json())
        .then((data) => {
            dispatch({
                type: GET_TIME,
                payload: data
            });
        });
}

// Fetch the data
export const fetchWeather = city => dispatch => {
    dispatch(fetchWeatherBegin());
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=4ae641e8880d4cdb0796bb5b4bd85f98&units=imperial`)
        .then(handleErrors)
        .then(res => res.json())
        .then(json => {
            dispatch(fetchWeatherSuccess(json));
            
            //get the local time:
            const lat = json.coord.lat;
            const lng = json.coord.lon;
            console.log('lat and lng: ',lat, lng);
            dispatch(fetchLocalTime(lat, lng));
            console.log(json);
        })
        .catch(error => dispatch(fetchWeatherFailure(error)))
};

// Handle Errors
function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
