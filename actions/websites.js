import toastr from 'toastr';
import actionTypes from './action-types';
import Website from '../backbone/models/website';
import Websites from '../backbone/collections/websites';

function createWebsiteRequest(website) {
  return dispatch => {
    website
      .save()
      .then(() => {
        toastr.success('Website created');
        window.LEB.reactRouterHistory.push('/websites');
        dispatch(createWebsiteSuccess());
      })
      .catch(e => {
        console.error(e);
        dispatch(createWebsiteFailure(website));
      });
  };
}

function createWebsiteSuccess() {
  return { type: actionTypes.CREATE_WEBSITE_SUCCESS };
}

function createWebsiteFailure(website) {
  return { type: actionTypes.CREATE_WEBSITE_FAILURE, website };
}

function saveWebsiteRequest(website) {
  return dispatch => {
    return website
      .save()
      .then(({ website }) => {
        toastr.success('Website saved');
        dispatch(saveWebsiteSuccess(website));
      })
      .catch(() => {
        toastr.error('Error saving website');
        // grab the original website on the server.
        return dispatch(fetchWebsiteRequest(website));
      })
      .finally(() => {
        dispatch(fetchWebsiteEventsRequest(website));
      });
  };
}

function fetchWebsiteEventsRequest(website) {
  return dispatch => {
    return website
      .fetchEvents()
      .then(() => {
        dispatch(fetchWebsiteEventsSuccess(website));
      })
      .catch(e => {
        dispatch(fetchWebsiteEventsFailure(website, e));
      });
  };
}

function saveWebsiteSuccess(website) {
  return { type: actionTypes.SAVE_WEBSITE_SUCCESS, website };
}

function fetchWebsitesRequest(websites) {
  return dispatch => {
    websites = websites || new Websites();
    websites.fetch().then(() => {
      dispatch(fetchWebsitesSuccess(websites));
    });
  };
}

function fetchWebsitesSuccess(websites) {
  return { type: actionTypes.FETCH_WEBSITES_SUCCESS, websites };
}

function fetchWebsiteRequest(id) {
  return dispatch => {
    const website = new Website({ id });
    return website
      .fetch()
      .then(() => {
        dispatch(fetchWebsiteSuccess(website));
      })
      .catch(e => {
        dispatch(fetchWebsiteFailure(website, e));
      });
  };
}

function fetchWebsiteEventsSuccess(website) {
  return { type: actionTypes.FETCH_WEBSITE_EVENTS_SUCCESS, website };
}

function fetchWebsiteEventsFailure(website, msg) {
  return { type: actionTypes.FETCH_WEBSITE_EVENTS_FAILURE, website, msg };
}

function fetchWebsiteFailure(website, msg) {
  return { type: actionTypes.FETCH_WEBSITE_FAILURE, website, msg };
}

function fetchWebsiteSuccess(website) {
  return { type: actionTypes.FETCH_WEBSITE_SUCCESS, website };
}

function deleteWebsiteRequest(website) {
  return dispatch => {
    website.destroy().then(() => {
      dispatch(deleteWebsiteSuccess());
    });
  };
}

function deleteWebsiteSuccess() {
  return dispatch => {
    toastr.success('Website deleted');
    window.LEB.reactRouterHistory.push('/websites');
    dispatch(fetchWebsitesRequest());
  };
}

export default {
  createWebsiteRequest,
  saveWebsiteRequest,
  fetchWebsitesRequest,
  fetchWebsiteRequest,
  fetchWebsiteEventsRequest,
  deleteWebsiteRequest
};
