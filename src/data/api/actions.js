import { SET_LOADING } from "../application/actions";
import { fetchBuilder } from '../utils';

export const FETCH_WEATHER_SUCCESS = "fetch_weather_success";
export const FETCH_WEATHER_ERROR = "fetch_weather_error";
export const FETCH_FORECAST_SUCCESS = "fetch_forecast_success";
export const FETCH_FORECAST_ERROR = "fetch_forecast_error";
export const WEATHER = "weather";
export const FORECAST = "forecast";

export const fetchWeather = (city, scope) => {
  return (dispatch) => {
    dispatch({type: SET_LOADING, payload: true});
    fetchBuilder(city, scope)
    .then(data => data.json())  
    .then(data => {
        if(data.cod == 404) {
          throw new Error();
        }
        dispatch({type: (scope == WEATHER ? FETCH_WEATHER_SUCCESS : FETCH_FORECAST_SUCCESS), payload: data});
        dispatch({type: SET_LOADING, payload: false})
      }).catch(error => {
        dispatch({type: SET_LOADING, payload: false})
        dispatch({type: (scope == WEATHER ? FETCH_WEATHER_ERROR : FETCH_FORECAST_ERROR), payload:true});
      });
  }
};