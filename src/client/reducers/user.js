import actionTypes from '../actions/action-types';

function createUser(state = {}, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER_SUCCESS:
    case actionTypes.CREATE_USER_FAILURE:
    default:
      return state;
  }
}

export default {
  createUser
};
