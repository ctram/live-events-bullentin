import actionTypes from '../actions/action-types';
import Templates from '../collections/templates';

const intialState = {
  templates: new Templates()
};

function storeTemplates(state = intialState, action) {
  let template;
  let { templates } = state;

  if (action.templates) {
    templates = new Templates(action.templates);
  }

  switch (action.type) {
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return Object.assign({}, state, {
        templates
      });
    case actionTypes.FETCH_TEMPLATE_SUCCESS:
      templates.add(action.template, { merge: true });
      // create new templates collection so that redux re-renders, look into why templates.clone() is not sufficient.
      templates = new Templates(templates.toJSON());
      return Object.assign({}, state, { templates });
    case actionTypes.FETCH_TEMPLATE_FAILURE:
      if (action.id) {
        template = templates.get(action.id);
        if (template) {
          template.set('error', action.msg);
        } else {
          templates.add({ id: action.id, error: action.msg });
        }
      }
      return Object.assign({}, state, templates);
    default:
      return state;
  }
}

export default {
  storeTemplates
};
