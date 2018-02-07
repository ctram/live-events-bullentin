import actionsLoader from './loader';
import actionTypes from './action-types';
import appConfig from '../app-config';

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

    return fetch(req)
      .then(res => {

        if (res.ok) {
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
