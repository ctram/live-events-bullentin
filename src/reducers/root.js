import actionTypes from '../actions/action-types';

const initialState = { redirectUrl: null};

function root(state = initialState, action) {
  switch (action.type) {
    case actionTypes.REDIRECT:
      return Object.assign(state, { redirectUrl: state.redirectUrl });
    default:
      return state;
  }
}

export default {
  root
};
