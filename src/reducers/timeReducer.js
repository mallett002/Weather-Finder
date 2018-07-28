import { GET_TIME } from '../actions/actionTypes'

const initialState = {
    localTime: {}
}

const timeReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TIME:
            return {
                ...state,
                localTime: action.payload
            }
        default:
            return state
    }
}

export default timeReducer