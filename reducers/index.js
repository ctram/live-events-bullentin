import reducerUsers from './users';
import reducerLoader from './loader';
import reducerWebsites from './websites';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, reducerUsers, reducerLoader, reducerWebsites);
export default combineReducers(reducers);
