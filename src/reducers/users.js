import actionTypes from '../actions/action-types';

const intialState = {
  users: [],
  loggedIn: false,
  currentUser: { email: '' }
};

function storeUsers(state = intialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users });
    case actionTypes.CHECK_AUTHENTICATION_SUCCESS:
    case actionTypes.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { loggedIn: true, currentUser: action.user });
    case actionTypes.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, { loggedIn: false, currentUser: null });
    default:
      return state;
  }
}

export default {
  storeUsers
};
