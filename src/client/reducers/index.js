import reducerUser from './user';
import reducerUsers from './users';
import reducerLoader from './loader';
import reducerRoot from './root';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, reducerUser, reducerUsers, reducerLoader, reducerRoot);
export default combineReducers(reducers);
