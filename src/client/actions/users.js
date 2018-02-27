import actionTypes from './action-types';
import appConfig from '../app-config';
import appFetch from '../helpers/app-fetch';
import requestParams from '../helpers/request-params';

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
        console.error('no users received from server');
      })
      .catch(e => console.error(e));
  };
}

function fetchUsersSuccess(users) {
  return { type: actionTypes.FETCH_USERS_SUCCESS, users };
}

export default {
  fetchUsersRequest
};
