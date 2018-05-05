import actionTypes from '../actions/action-types';
import Websites from '../backbone/collections/websites';
import Website from '../backbone/models/website';

const intialState = {
  websites: new Websites(),
  currentWebsite: new Website()
};

function storeWebsites(state = intialState, action) {
  let { websites } = state;

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
    case actionTypes.FETCH_WEBSITE_FAILURE:
    case actionTypes.FETCH_WEBSITE_EVENTS_SUCCESS:
      websites.add(action.website, { merge: true });
      // create new websites collection so that redux re-renders, look into why websites.clone() is not sufficient.
      websites = new Websites(websites.toJSON());
      return Object.assign({}, state, { websites });
    case actionTypes.FETCH_WEBSITE_EVENTS_FAILURE:
      action.website.set({ events: null, error: action.msg });
      websites.add(action.website, { merge: true });
      websites = new Websites(websites.toJSON());
      return Object.assign({}, state, { websites });
    case actionTypes.CREATE_WEBSITE_FAILURE:
      return Object.assign({}, state, { currentWebsite: action.website });
    case actionTypes.CREATE_WEBSITE_SUCCESS:
      return Object.assign({}, state, { currentWebsite: new Website() });
    default:
      return state;
  }
}

export default {
  storeWebsites
};
