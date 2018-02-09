import actionsLoader from './loader';
import actionTypes from './action-types';
import appConfig from '../app-config';
import betterFetch from '../helpers/fetch-wrapper';

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

    // TODO: tweak to auto redirect in react.
    return betterFetch(req)
      .then(res => {
        if (res.ok) {
          window.reactRouterHistory.push('/hank');
          dispatch(createUserSuccess(res));
        } else {
          dispatch(createUserFailure(res));
        }
      })
      .then(() => dispatch(actionsLoader.endLoading()));
  };
}

export default {
  createUserRequest,
  createUserSuccess
};
