import appFetch from '../helpers/app-fetch';
import requestParams from '../helpers/request-params';
import toastr from 'toastr';
import actionTypes from './action-types';
const appConfig = window.LEB.appConfig;

function createWebsiteRequest(data) {
  return () => {
    const req = new Request(
      appConfig.serverUrl + `/api/websites`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    appFetch(req).then(() => {
      toastr.success('Website created');
      window.LEB.reactRouterHistory.push('/websites');
    });
  };
}

function saveWebsiteRequest(data) {
  return dispatch => {
    const req = new Request(
      appConfig.serverUrl + `/api/websites/${data.id}`,
      Object.assign(requestParams, { method: 'PATCH', body: JSON.stringify(data) })
    );
    dispatch(setWebsite(data));

    appFetch(req)
      .then(({ website }) => {
        toastr.success('Website saved');
        dispatch(saveWebsiteSuccess(website));
      })
      .catch(() => {
        toastr.error('Error saving website');
        // grab the original website on the server.
        return dispatch(fetchWebsiteRequest(data.id));
      })
      .then(() => {
        dispatch(fetchWebsiteEventsRequest(data.id));
      });
  };
}

function setWebsite(website) {
  return { type: actionTypes.SET_WEBSITE, website };
}

function saveWebsiteSuccess(website) {
  return { type: actionTypes.SAVE_WEBSITE_SUCCESS, website };
}

function fetchWebsitesRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.serverUrl + `/api/websites`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    appFetch(req).then(res => {
      dispatch(fetchWebsitesSuccess(res.websites));
    });
  };
}

function fetchWebsitesSuccess(websites) {
  return { type: actionTypes.FETCH_WEBSITES_SUCCESS, websites };
}

function fetchWebsiteRequest(id) {
  return dispatch => {
    const req = new Request(
      appConfig.serverUrl + `/api/websites/${id}`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    return appFetch(req)
      .then(res => {
        dispatch(fetchWebsiteSuccess(res.website));
      })
      .catch(e => {
        dispatch(fetchWebsiteFailure(id, e));
      });
  };
}

function fetchWebsiteEventsRequest(id) {
  return dispatch => {
    const req = new Request(
      appConfig.serverUrl + `/api/websites/${id}/events`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    appFetch(req)
      .then(({ events, websiteId }) => {
        dispatch(fetchWebsiteEventsSuccess(events, websiteId));
      })
      .catch(e => {
        dispatch(fetchWebsiteEventsFailure(id, e));
      });
  };
}

function fetchWebsiteEventsSuccess(events, id) {
  return { type: actionTypes.FETCH_WEBSITE_EVENTS_SUCCESS, events, id };
}

function fetchWebsiteEventsFailure(id, msg) {
  return { type: actionTypes.FETCH_WEBSITE_EVENTS_FAILURE, id, msg };
}

function fetchWebsiteFailure(id, msg) {
  return { type: actionTypes.FETCH_WEBSITE_FAILURE, id, msg };
}

function fetchWebsiteSuccess(website, events) {
  return { type: actionTypes.FETCH_WEBSITE_SUCCESS, website, events, id: website.id };
}

function deleteWebsiteRequest(id) {
  return dispatch => {
    const req = new Request(
      appConfig.serverUrl + `/api/websites/${id}`,
      Object.assign(requestParams, { method: 'DELETE', body: null })
    );

    appFetch(req).then(() => {
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
