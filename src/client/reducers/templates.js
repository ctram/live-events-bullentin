import actionTypes from '../actions/action-types';

const intialState = {
  templates: []
};

function storeTemplates(state = intialState, action) {
  
  switch (action.type) {
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return Object.assign({}, state, { templates: action.templates });
    default:
      return state;
  }
}

export default {
  storeTemplates
};
