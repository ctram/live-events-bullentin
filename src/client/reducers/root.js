import actionTypes from '../actions/action-types';

const appHost = 'http://localhost:3000';
const initialState = { redirectUrl: null };

function root(state = initialState, action) {
  
  let host = null;
  let path = null;
  let url = null;

  switch (action.type) {
    case actionTypes.REDIRECT:
      [host, path] = action.redirectUrl.split(appHost);
      url = path ? path : action.redirectUrl;
      return Object.assign({}, state, { redirectUrl: url });
    default:
      return state;
  }
}

export default {
  root
};
