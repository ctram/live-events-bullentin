import reducerUsers from './users';
import reducerLoader from './loader';
import reducerWebsites from './websites';
import reducerModalData from './modal-data';
import { combineReducers } from 'redux';

const reducers = Object.assign({}, reducerUsers, reducerLoader, reducerWebsites, reducerModalData);
export default combineReducers(reducers);
