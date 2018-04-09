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

  switch (action.type) {
    case actionTypes.FETCH_TEMPLATES_SUCCESS:
      return Object.assign({}, state, {
        templates
      });
    case actionTypes.SAVE_TEMPLATE_SUCCESS:
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
    case actionTypes.FETCH_TEMPLATE_EVENTS_SUCCESS:
      template = templates.get(action.id);
      template.set('events', action.events);
      templates = new Templates(templates.toJSON());
      return Object.assign({}, state, { templates });
    case actionTypes.FETCH_TEMPLATE_EVENTS_FAILURE:
      template = templates.get(action.id);
      template.set('events', null);
      template.set('error', action.msg);
      templates = new Templates(templates.toJSON());
      return Object.assign({}, state, { templates });
    case actionTypes.SET_TEMPLATE:
      template = templates.get(action.template.id);
      template.set(action.template);
      templates = new Templates(templates.toJSON());
      return Object.assign({}, state, { templates });
    default:
      return state;
  }
}

export default {
  storeTemplates
};
