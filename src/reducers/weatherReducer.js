import { 
    FETCH_WEATHER_BEGIN,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_FAILURE,
    GET_INITIAL_STATE
} from '../actions/actionTypes'

const initialState = {
    weatherData: {},
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_WEATHER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case FETCH_WEATHER_SUCCESS:
            return {
                ...state,
                weatherData: action.payload.weather,
                loading: false,
            };

        case FETCH_WEATHER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                weatherData: {}
            };

        case GET_INITIAL_STATE:
            return {
                ...initialState,
            }

        default:
            return state
    }
}
