import { SET_LOADING, TOGGLE_SIDE_MENU, TOGGLE_DATA_TAB, TOGGLE_MODAL } from "./actions";
import { Animated } from 'react-native';

const INITIAL_STATE = {
    applicationInitialized: false,
    loading: false,
    applicationError: false,
    sideMenuValue: new Animated.Value(-200),
    sideMenuOpen: false,
    weatherActive: true,
    forecastActive: false,
    modalVisible:false,
}

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        sideMenuOpen: action.payload.open,
      }
    case TOGGLE_DATA_TAB:
      return {
        ...state,
        weatherActive: !state.weatherActive,
        forecastActive: !state.forecastActive
      };
    case TOGGLE_MODAL:
      return {
        ...state,
        modalVisible: !state.modalVisible
      }
    default:
      return state;
  }
};