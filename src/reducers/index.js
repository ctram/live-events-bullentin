import reducerUser from './user';
import reducerLoader from './loader';
import reducerRoot from './root';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, reducerUser, reducerLoader, reducerRoot);
export default combineReducers(reducers);
