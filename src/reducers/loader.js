import actionTypes from '../actions/action-types';

const initialState = {
  loaded: false
};

function loader(state = initialState, action) {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return Object.assign({}, state, { loaded: false });
    case actionTypes.END_LOADING:
      return Object.assign({}, state, { loaded: true });
    default:
      return state;
  }
}

export default {
  loader
};
