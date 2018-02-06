import reducerUser from './user';
import reducerLoader from './loader';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, reducerUser, reducerLoader);
export default combineReducers(reducers);
