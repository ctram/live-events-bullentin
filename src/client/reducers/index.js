import reducerUsers from './users';
import reducerLoader from './loader';
import reducerTemplates from './templates';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, reducerUsers, reducerLoader, reducerTemplates);
export default combineReducers(reducers);
