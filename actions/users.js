import actionTypes from './action-types';
import appFetch from '../helpers/app-fetch';
import requestParams from '../helpers/request-params';
import toastr from 'toastr';
import Users from '../backbone/collections/users';
import User from '../backbone/models/user';
import parseError from '../helpers/error-parser';
import loader from './loader';
import appConfig from '../app-config';

function fetchUsersRequest(users = new Users()) {
  return dispatch => {
    dispatch(loader.startLoading());
    return users
      .fetch()
      .then(() => {
        dispatch(fetchUsersSuccess(users));
      })
      .catch(e => {
        toastr.error(parseError(e));
      })
      .always(() => {
        dispatch(loader.endLoading());
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
        appConfig.reactRouterHistory.push('/login');
      })
      .catch(e => {
        toastr.error(parseError(e));
      })
      .always(() => {
        dispatch(loader.endLoading());
      });
  };
}

function loginUserRequest(data) {
  return dispatch => {
    dispatch(loader.startLoading());
    requestParams;
    const req = new Request(
      appConfig.serverUrl + `/api/login`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    return appFetch(req)
      .then(data => {
        if (data.user) {
          return dispatch(loginUserSuccess(data.user));
        }
        toastr.error('Login Failed');
      })
      .finally(() => {
        dispatch(loader.endLoading());
      });
  };
}

function loginUserSuccess(user) {
  toastr.success('Login Successful');
  appConfig.reactRouterHistory.push('/websites');
  return { type: actionTypes.LOGIN_USER_SUCCESS, user };
}

function checkAuthenticationRequest() {
  return dispatch => {
    dispatch(loader.startLoading());
    const req = new Request(
      appConfig.serverUrl + `/api/authentication`,
      Object.assign(requestParams, { method: 'GET' })
    );

    return appFetch(req)
      .then(data => {
        toastr.success('Authenticated');
        appConfig.reactRouterHistory.push('/websites');
        return dispatch(checkAuthenticationSuccess(data.user));
      })
      .catch(() => {
        appConfig.reactRouterHistory.push('/login');
        dispatch(checkAuthenticationFailure());
      })
      .finally(() => {
        dispatch(loader.endLoading());
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
    dispatch(loader.startLoading());
    const req = new Request(
      appConfig.serverUrl + `/api/logout`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    return appFetch(req)
      .then(() => {
        dispatch(logoutUserSuccess());
        toastr.success('Logged Out Successfully');
        appConfig.reactRouterHistory.push('/login');
      })
      .finally(() => {
        dispatch(loader.endLoading());
      });
  };
}

function logoutUserSuccess() {
  return { type: actionTypes.LOGOUT_USER_SUCCESS };
}

function deleteUserRequest(user) {
  return dispatch => {
    dispatch(loader.startLoading());
    return user
      .destroy({ wait: true })
      .then(() => {
        toastr.success('User deleted successfully');
      })
      .catch(e => {
        toastr.error(parseError(e));
      })
      .always(() => {
        dispatch(loader.endLoading());
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
