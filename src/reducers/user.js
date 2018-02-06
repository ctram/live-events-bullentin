import actionTypes from '../actions/action-types';

function createUser(state = {}, action) {
  if (action.type === actionTypes.CREATE_USER_SUCCESS) {
    return state;
  }
  return state;
}

export default {
  createUser
};
