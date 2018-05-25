import actionTypes from '../actions/action-types';
import User from '../backbone/models/user';
import Users from '../backbone/collections/users';

const intialState = {
  users: new Users(),
  loggedIn: false,
  currentUser: null
};

function storeUsers(state = intialState, action) {
  let currentUser;

  switch (action.type) {
    case actionTypes.FETCH_USERS_SUCCESS:
      return Object.assign({}, state, { users: action.users });
    case actionTypes.CHECK_AUTHENTICATION_SUCCESS:
    case actionTypes.LOGIN_USER_SUCCESS:
      currentUser = new User(action.user);
      return Object.assign({}, state, { loggedIn: true, currentUser });
    case actionTypes.CHECK_AUTHENTICATION_FAILURE:
    case actionTypes.LOGOUT_USER_SUCCESS:
      return Object.assign({}, state, { loggedIn: false, currentUser: null });
    default:
      return state;
  }
}

export default {
  storeUsers
};
