import actionTypes from '../actions/action-types';
import Templates from '../collections/templates';

const intialState = {
  templates: new Templates()
};

function storeTemplates(state = intialState, action) {
  const { templates } = state;

  switch (action.type) {
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return Object.assign({}, state, {
        templates: new Templates(action.templates)
      });
    case actionTypes.FETCH_TEMPLATE_SUCCESS:
      if (action.events) {
        action.template.events = action.events;
      }
      templates.add(action.template);
      return Object.assign({}, state, { templates });
    default:
      return state;
  }
}

export default {
  storeTemplates
};
