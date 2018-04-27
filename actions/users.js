import actionTypes from './action-types';
import appFetch from '../helpers/app-fetch';
import requestParams from '../helpers/request-params';
import toastr from 'toastr';
const appConfig = window.LEB.appConfig;

console.log('appConfig', appConfig);

function fetchUsersRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.serverUrl + '/api/users',
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    appFetch(req)
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
    window.LEB.reactRouterHistory.push(data.redirectUrl);
  }
  return { type: null };
}

function createUserRequest(data) {
  return function(dispatch) {
    const req = new Request(
      // eslint-disable-next-line quotes
      appConfig.serverUrl + `/api/users`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    appFetch(req, dispatch).then(data => {
      toastr.success('Registration complete, please login');
      window.LEB.reactRouterHistory.push('/login');
      dispatch(createUserSuccess(data));
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

function fetchUserRequest(id) {
  return () => {
    const req = new Request(
      appConfig.serverUrl + `/api/users/${id}`,
      Object.assign(requestParams, { method: 'GET' })
    );

    appFetch(req).then(data => {
      // FIXME: why?
      const users = window.LEB.ClientStore.users;
      let user = users.find(data.user.id);
      if (!user) {
        users.add(data.user);
      }
    });
  };
}

function checkAuthenticationRequest() {
  return dispatch => {
    console.log('app config in authetication', appConfig);

    console.log('appconfig', appConfig);

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
      window.LEB.reactRouterHistory.push('/');
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
  createUserSuccess,
  deleteUserRequest,
  loginUserRequest,
  logoutUserRequest,
  fetchUserRequest,
  fetchUsersRequest,
  checkAuthenticationRequest
};
