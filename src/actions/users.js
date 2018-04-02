import actionTypes from './action-types';
import appConfig from '../app-config';
import appFetch from '../helpers/app-fetch';
import requestParams from '../helpers/request-params';
import toastr from 'toastr';

function fetchUsersRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + '/api/users',
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    return appFetch(req)
      .then(data => {
        if (data.users) {
          return dispatch(fetchUsersSuccess(data.users));
        }
        console.error('No Users Received From Server');
      })
      .catch(e => console.error(e));
  };
}

function fetchUsersSuccess(users) {
  return { type: actionTypes.FETCH_USERS_SUCCESS, users };
}

function createUserSuccess(data) {
  data = Object.assign(data, { redirectUrl: '/login' });
  if (data.redirectUrl) {
    window.reactRouterHistory.push(data.redirectUrl);
  }
  return { type: null };
}

function createUserRequest(data) {
  return function(dispatch) {
    const req = new Request(
      // eslint-disable-next-line quotes
      appConfig.urlDomain + `/api/users`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    return appFetch(req, dispatch).then(data => {
      toastr.success('Successfully Created User');
      dispatch(createUserSuccess(data));
    });
  };
}

function loginUserRequest(data) {
  return dispatch => {
    requestParams;
    const req = new Request(
      appConfig.urlDomain + `/api/login`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    return appFetch(req).then(data => {
      if (data.user) {
        return dispatch(loginUserSuccess(data.user));
      }
      toastr.error('Login Failed');
    });
  };
}

function loginUserSuccess(user) {
  toastr.success('Login Successful');
  window.reactRouterHistory.push('/templates');
  return { type: actionTypes.LOGIN_USER_SUCCESS, user };
}

function fetchUserRequest(id) {
  return () => {
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

function checkAuthenticationRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/authentication`,
      Object.assign(requestParams, { method: 'GET' })
    );

    return appFetch(req).then(data => {
      if (data.user) {
        toastr.success('Authenticated');
        return dispatch(checkAuthenticationSuccess(data.user));
      }
    });
  };
}

function checkAuthenticationSuccess(user) {
  return { type: actionTypes.CHECK_AUTHENTICATION_SUCCESS, user };
}

function logoutUserRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/logout`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    return appFetch(req).then(() => {
      dispatch(logoutUserSuccess());
      toastr.success('Logged Out Successfully');
      window.reactRouterHistory.push('/');
    });
  };
}

function logoutUserSuccess() {
  return { type: actionTypes.LOGOUT_USER_SUCCESS };
}

export default {
  createUserRequest,
  createUserSuccess,
  loginUserRequest,
  logoutUserRequest,
  fetchUserRequest,
  fetchUsersRequest,
  checkAuthenticationRequest
};
