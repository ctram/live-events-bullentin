import actionsLoader from './loader';
import actionTypes from './action-types';
import appConfig from '../app-config';
import appFetch from '../helpers/app-fetch';
import Users from '../collections/users';

window.ClientStore = window.ClientStore || {};
window.ClientStore.users = window.ClientStore.users || new Users();
const users = window.ClientStore.users;

const urlDomain = `http://${appConfig.host}:${appConfig.port}`;

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

function createUserSuccess(data) {
  data = Object.assign(data, { redirectUrl: '/login' });

  if (data.redirectUrl) {
    window.reactRouterHistory.push(data.redirectUrl);
  }
  return { type: null };
}

function createUserRequest(data) {
  return function(dispatch) {
    dispatch(actionsLoader.startLoading());
    // eslint-disable-next-line quotes
    const url = urlDomain + `/users`;
    const req = new Request(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(data)
    });

    return appFetch(req, dispatch)
      .then(data => {
        dispatch(createUserSuccess(data));
      })
      .then(() => dispatch(actionsLoader.endLoading()));
  };
}

function loginUserRequest(data) {
  return dispatch => {
    dispatch(actionsLoader.startLoading());
    // eslint-disable-next-line quotes
    const url = urlDomain + `/login`;
    const req = new Request(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(data)
    });

    return appFetch(req, dispatch)
      .then(data => {
        console.log('login response:', data);
        users.add(data.user);
        if (data.redirectUrl) {
          window.reactRouterHistory.push(data.redirectUrl);
          console.log('users:', users);
        }
      })
      .catch(e => console.error('appFetch error:', e))
      .then(() => dispatch(actionsLoader.endLoading()));
  };
}

export default {
  createUserRequest,
  createUserSuccess,
  loginUserRequest
};
