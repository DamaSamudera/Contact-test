import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import home from '../pages/Home/reducer';

const rootReducer = combineReducers({
  routing: routerReducer,
  home,
});

export default rootReducer;
