import { GET_TIME,
    FETCH_TIME_BEGIN,
    FETCH_TIME_SUCCESS
} from '../actions/actionTypes'

const initialState = {
    localTime: {},
    loadingTime: false
}

const timeReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TIME:
            return {
                ...state,
                localTime: action.payload
            }
        case FETCH_TIME_BEGIN:
            return {
                ...state,
                loadingTime: true
            }
        case FETCH_TIME_SUCCESS:
            return {
                ...state, 
                loadingTime: false
            }
        default:
            return state
    }
}

export default timeReducer