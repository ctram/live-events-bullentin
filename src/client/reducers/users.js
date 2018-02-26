import actionTypes from '../actions/action-types';

const intialState = {
  users: []
};

function users(state = intialState, action) {
  
  switch (action.type) {
    case actionTypes.FETCH_USERS_SUCCESS:
      return Object.assign(state, { users: action.users });
    default:
      return state;
  }
}

export default {
  users
};
