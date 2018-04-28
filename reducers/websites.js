import actionTypes from '../actions/action-types';
import Websites from '../backbone/collections/websites';
import Website from '../backbone/models/website';

const intialState = {
  websites: new Websites(),
  newWebsite: new Website()
};

function storeWebsites(state = intialState, action) {
  let { websites } = state;
  let website;

  if (action.websites) {
    websites = new Websites(action.websites);
  }

  switch (action.type) {
    case actionTypes.FETCH_WEBSITES_SUCCESS:
      return Object.assign({}, state, {
        websites
      });
    case actionTypes.SAVE_WEBSITE_SUCCESS:
    case actionTypes.FETCH_WEBSITE_SUCCESS:
      websites.add(action.website, { merge: true });
      // create new websites collection so that redux re-renders, look into why websites.clone() is not sufficient.
      websites = new Websites(websites.toJSON());
      return Object.assign({}, state, { websites });
    case actionTypes.FETCH_WEBSITE_FAILURE:
      if (action.id) {
        website = websites.get(action.id);
        if (website) {
          website.set('error', action.msg);
        } else {
          websites.add({ id: action.id, error: action.msg });
        }
      }
      return Object.assign({}, state, websites);
    case actionTypes.FETCH_WEBSITE_EVENTS_SUCCESS:
      website = websites.get(action.id);
      website.set('events', action.events);
      websites = new Websites(websites.toJSON());
      return Object.assign({}, state, { websites });
    case actionTypes.FETCH_WEBSITE_EVENTS_FAILURE:
      website = websites.get(action.id);
      website.set('events', null);
      website.set('error', action.msg);
      websites = new Websites(websites.toJSON());
      return Object.assign({}, state, { websites });
    case actionTypes.SET_WEBSITE:
      website = websites.get(action.website.id);
      website.set(action.website);
      websites = new Websites(websites.toJSON());
      return Object.assign({}, state, { websites });
    case actionTypes.CREATE_WEBSITE_FAILURE:
      return Object.assign({}, state, { newWebsite: new Website(action.website) });
    case actionTypes.CREATE_WEBSITE_SUCCESS:
      return Object.assign({}, state, { newWebsite: new Website() });
    default:
      return state;
  }
}

export default {
  storeWebsites
};
