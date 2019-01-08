import { combineReducers } from 'redux';
import ApplicationReducer from './application/reducer';
import ApiReducer from './api/reducer';
export default combineReducers({
  application: ApplicationReducer,
  api: ApiReducer
});