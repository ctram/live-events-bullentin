import actionTypes from '../actions/action-types';

const intialState = {
  loggedIn: false
};

function user(state = intialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_USER_SUCCESS:
    case actionTypes.CREATE_USER_FAILURE:
    case actionTypes.LOGIN_USER_SUCCESS:
      return Object.assign(state, { loggedIn: true, currentUser: action.user });
    default:
      return state;
  }
}

export default {
  user
};
