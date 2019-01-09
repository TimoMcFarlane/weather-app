import { combineReducers } from 'redux';
import ApplicationReducer from './application/reducer';
import ApiReducer from './api/reducer';
import LocationReducer from './location/reducer';
export default combineReducers({
  application: ApplicationReducer,
  api: ApiReducer,
  location: LocationReducer
});