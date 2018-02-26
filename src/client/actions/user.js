import actionsLoader from './loader';
import actionTypes from './action-types';
import appConfig from '../app-config';
import appFetch from '../helpers/app-fetch';
import Users from '../collections/users';
import requestParams from '../helpers/request-params';

const users = new Users();

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
    const req = new Request(
      // eslint-disable-next-line quotes
      appConfig.urlDomain + `/api/users`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    return appFetch(req, dispatch)
      .then(data => {
        dispatch(createUserSuccess(data));
      })
      .then(() => dispatch(actionsLoader.endLoading()));
  };
}

function loginUserSuccess(user) {
  return { type: actionTypes.LOGIN_USER_SUCCESS, user };
}

function loginUserRequest(data) {
  return dispatch => {
    dispatch(actionsLoader.startLoading());
    requestParams;
    const req = new Request(
      // eslint-disable-next-line quotes
      appConfig.urlDomain + `/api/login`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    return appFetch(req)
      .then(data => {
        console.log('login response:', data);
        
        dispatch(loginUserSuccess(data.user));
        if (data.redirectUrl) {
          window.reactRouterHistory.push(data.redirectUrl);
        }
      })
      .catch(e => console.error('appFetch error:', e))
      .then(() => dispatch(actionsLoader.endLoading()));
  };
}

function fetchUserRequest(id) {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/users/${id}`,
      Object.assign(requestParams, { method: 'GET' })
    );

    return appFetch(req).then(data => {
      const users = window.ClientStore.users;
      let user = users.find(data.user.id);
      if (!user) {
        users.add(data.user);
      }
    });
  };
}

export default {
  createUserRequest,
  createUserSuccess,
  loginUserRequest,
  fetchUserRequest
};
