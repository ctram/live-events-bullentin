import actionsLoader from './loader';
import actionTypes from './action-types';
import appConfig from '../app-config';
import appFetch from '../helpers/app-fetch';

function createUserSuccess(data) {
  return { type: actionTypes.CREATE_USER_SUCCESS, data };
}

function createUserFailure(data) {
  return { type: actionTypes.CREATE_USER_FAILURE, data };
}

function createUserRequest(data) {
  return function(dispatch) {
    dispatch(actionsLoader.startLoading());
    const url = `http://${appConfig.host}:${appConfig.port}/users`;
    const req = new Request(url, {
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    });

    return appFetch(req, dispatch)
      .catch(e => e)
      .then(() => dispatch(actionsLoader.endLoading()));
  };
}

export default {
  createUserRequest,
  createUserSuccess
};
