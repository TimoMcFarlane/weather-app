import { save, load, clear } from '../storage';
import { SET_LOADING } from "../application/actions";
import { fetchWeather, WEATHER } from '../api/actions';

export const REMOVE_EXISTING_LOCATION = "remove_existing_location";
export const NEW_LOCATION_ON_CHANGE = "new_location_on_change";
export const LOAD_LOCATIONS = "load_locations";
export const SET_LOCATIONS = "set_locations";
export const ERROR = "error";

export const CLEAR_ADDED_LOCATION = "clear_added_location";

const LOCATIONS = "locations";

export const addNewLocation = (value) => {
  return (dispatch) => {
    dispatch({type: SET_LOADING, payload: true});
    save(LOCATIONS, value).then(val => {
      dispatch({type: SET_LOADING, payload: false});
    })
    .catch(error => {
      dispatch({type: SET_LOADING, payload: false});
      dispatch({type: ERROR, payload: error.message})
    });
  };
};

export const loadLocations = () => {
  return (dispatch) => {
    load(LOCATIONS).then(val => {
      dispatch({type: SET_LOCATIONS, payload: JSON.parse(val)})
    }).catch(error => {
      dispatch({type: ERROR, payload: error.message})
    });
  };
};

export const clearLocations = () => {
  return (dispatch) => {
    clear();
  };
};

export const newLocationOnChange = (value) => {
  return {
    type: NEW_LOCATION_ON_CHANGE,
    payload: value
  }
};
