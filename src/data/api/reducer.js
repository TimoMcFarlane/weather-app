import { FETCH_WEATHER_SUCCESS, FETCH_WEATHER_ERROR, FETCH_FORECAST_SUCCESS, FETCH_FORECAST_ERROR } from './actions';

const INITIAL_STATE = {
  error: false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case FETCH_WEATHER_SUCCESS: 
      return {
        ...state,
        weather: action.payload
      };
    case FETCH_WEATHER_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        forecast: action.payload
      }
    case FETCH_FORECAST_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}