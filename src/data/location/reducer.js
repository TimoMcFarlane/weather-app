import { 
  REMOVE_EXISTING_LOCATION, 
  NEW_LOCATION_ON_CHANGE, 
  LOAD_LOCATIONS, 
  SET_LOCATIONS, 
  ERROR 
} from './actions';

const INITIAL_STATE = {
  locations: [{"name":"Tampere", "selected":true}],
  error: false,
  errorMessage: null,
  locationToBeAdded: "",
  selectedLocation: "Tampere"
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_LOCATIONS: 
    return {
        ...state,
        locations: action.payload !== null ? [...action.payload] : [...state.locations],
        selectedLocation: action.payload.find(location => location.selected).name
      }
    case NEW_LOCATION_ON_CHANGE:
      return {
        ...state,
        locationToBeAdded: action.payload
      };
    case ERROR:
      return {
        ...state,
        error: true,
        errorMessage: action.payload
      }
    default:
      return state;
  }
}