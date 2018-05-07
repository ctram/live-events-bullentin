import actionTypes from './action-types';
import appFetch from '../helpers/app-fetch';
import requestParams from '../helpers/request-params';
import toastr from 'toastr';
import Users from '../backbone/collections/users';
import User from '../backbone/models/user';
import parseError from '../helpers/error-parser';
import loader from './loader';
const appConfig = window.LEB.appConfig;

function fetchUsersRequest(users = new Users()) {
  return dispatch => {
    users
      .fetch()
      .then(() => {
        return dispatch(fetchUsersSuccess(users));
      })
      .catch(e => {
        toastr.error(e);
        console.error(e);
      });
  };
}

function fetchUsersSuccess(users) {
  return { type: actionTypes.FETCH_USERS_SUCCESS, users };
}

function createUserRequest(data) {
  return dispatch => {
    dispatch(loader.startLoading());
    new User(data)
      .save()
      .then(() => {
        toastr.success('Registration complete, please login');
        window.LEB.reactRouterHistory.push('/login');
      })
      .catch(e => {
        toastr.error(parseError(e));
      })
      .finally(() => {
        dispatch(loader.endLoading());
      });
  };
}

function loginUserRequest(data) {
  return dispatch => {
    requestParams;
    const req = new Request(
      appConfig.serverUrl + `/api/login`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    appFetch(req).then(data => {
      if (data.user) {
        return dispatch(loginUserSuccess(data.user));
      }
      toastr.error('Login Failed');
    });
  };
}

function loginUserSuccess(user) {
  toastr.success('Login Successful');
  window.LEB.reactRouterHistory.push('/websites');
  return { type: actionTypes.LOGIN_USER_SUCCESS, user };
}

function checkAuthenticationRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.serverUrl + `/api/authentication`,
      Object.assign(requestParams, { method: 'GET' })
    );

    appFetch(req).then(data => {
      if (data.user) {
        toastr.success('Authenticated');
        return dispatch(checkAuthenticationSuccess(data.user));
      }
      window.LEB.reactRouterHistory.push('/login');
      return dispatch(checkAuthenticationFailure());
    });
  };
}

function checkAuthenticationSuccess(user) {
  return { type: actionTypes.CHECK_AUTHENTICATION_SUCCESS, user };
}

function checkAuthenticationFailure() {
  return { type: actionTypes.CHECK_AUTHENTICATION_FAILURE };
}

function logoutUserRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.serverUrl + `/api/logout`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    appFetch(req).then(() => {
      dispatch(logoutUserSuccess());
      toastr.success('Logged Out Successfully');
      window.LEB.reactRouterHistory.push('/login');
    });
  };
}

function logoutUserSuccess() {
  return { type: actionTypes.LOGOUT_USER_SUCCESS };
}

function deleteUserRequest(id) {
  return () => {
    const req = new Request(
      appConfig.serverUrl + `/api/users/${id}`,
      Object.assign(requestParams, { method: 'DELETE', body: null })
    );

    appFetch(req).then(() => {
      toastr.success('User deleted successfully');
    });
  };
}

export default {
  createUserRequest,
  deleteUserRequest,
  loginUserRequest,
  logoutUserRequest,
  fetchUsersRequest,
  checkAuthenticationRequest
};
