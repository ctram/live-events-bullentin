import toastr from 'toastr';
import actionTypes from './action-types';
import Website from '../backbone/models/website';
import Websites from '../backbone/collections/websites';
import parseError from '../helpers/error-parser';
import loader from './loader';
import appConfig from '../app-config';

function createWebsiteRequest(website) {
  return dispatch => {
    dispatch(loader.startLoading());
    return website
      .save()
      .then(() => {
        toastr.success('Website created');
        appConfig.reactRouterHistory.push('/websites');
        dispatch(createWebsiteSuccess());
      })
      .catch(e => {
        toastr.error(parseError(e));
        dispatch(createWebsiteFailure(website));
      })
      .always(() => dispatch(loader.endLoading()));
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
    dispatch(loader.startLoading());
    return website
      .save()
      .then(({ website }) => {
        toastr.success('Website saved');
        dispatch(saveWebsiteSuccess(website));
      })
      .catch(e => {
        toastr.error(parseError(e));
        // grab the original website on the server.
        return dispatch(fetchWebsiteRequest(website.id));
      })
      .always(() => {
        dispatch(loader.endLoading());
        dispatch(fetchWebsiteEventsRequest(website));
      });
  };
}

function fetchWebsiteEventsRequest(website) {
  return dispatch => {
    dispatch(loader.startLoading());
    return website
      .fetchEvents()
      .then(() => {
        dispatch(fetchWebsiteEventsSuccess(website));
      })
      .catch(e => {
        toastr.error(parseError(e));
        dispatch(fetchWebsiteEventsFailure(website, e));
      })
      .finally(() => dispatch(loader.endLoading()));
  };
}

function saveWebsiteSuccess(website) {
  return { type: actionTypes.SAVE_WEBSITE_SUCCESS, website };
}

function fetchWebsitesRequest(websites = new Websites()) {
  return dispatch => {
    dispatch(loader.startLoading());
    return websites
      .fetch()
      .then(() => {
        dispatch(fetchWebsitesSuccess(websites));
      })
      .catch(e => {
        toastr.error(parseError(e));
      })
      .always(() => dispatch(loader.endLoading()));
  };
}

function fetchWebsitesSuccess(websites) {
  return { type: actionTypes.FETCH_WEBSITES_SUCCESS, websites };
}

function fetchWebsiteRequest(id) {
  return dispatch => {
    dispatch(loader.startLoading());
    const website = new Website({ id });
    return website
      .fetch()
      .then(() => {
        dispatch(fetchWebsiteSuccess(website));
      })
      .catch(e => {
        dispatch(loader.endLoading());
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
    dispatch(loader.startLoading());
    return website
      .destroy()
      .then(() => {
        dispatch(deleteWebsiteSuccess());
      })
      .catch(e => toastr.error(parseError(e)))
      .always(() => dispatch(loader.endLoading()));
  };
}

function deleteWebsiteSuccess() {
  return dispatch => {
    toastr.success('Website deleted');
    appConfig.reactRouterHistory.push('/websites');
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
