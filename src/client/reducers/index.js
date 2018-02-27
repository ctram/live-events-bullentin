import reducerUsers from './users';
import reducerLoader from './loader';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, reducerUsers, reducerLoader);
export default combineReducers(reducers);
