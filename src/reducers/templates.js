import actionTypes from '../actions/action-types';
import Templates from '../collections/templates';

const intialState = {
  templates: new Templates()
};

function storeTemplates(state = intialState, action) {
  let { templates } = state;
  let template;

  if (action.templates) {
    templates = new Templates(action.templates);
  }
  if (action.id) {
    template = templates.get(action.id);
  }

  switch (action.type) {
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return Object.assign({}, state, {
        templates
      });
    case actionTypes.FETCH_TEMPLATE_SUCCESS:
      if (action.events) {
        action.template.events = action.events;
      }
      templates.add(action.template, { merge: true });
      return Object.assign({}, state, { templates });
    case actionTypes.FETCH_TEMPLATE_FAILURE:
      if (template) {
        template.set('error', action.msg);
      } else {
        templates.add({ id: action.id, error: action.msg });
      }
      return Object.assign({}, state, templates);
    default:
      return state;
  }
}

export default {
  storeTemplates
};
