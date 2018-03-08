import appConfig from '../app-config';
import appFetch from '../helpers/app-fetch';
import requestParams from '../helpers/request-params';
import toastr from 'toastr';
import actionTypes from './action-types';

function createTemplateRequest(data) {
  return () => {
    const req = new Request(
      appConfig.urlDomain + `/api/templates`,
      Object.assign(requestParams, { method: 'POST', body: JSON.stringify(data) })
    );

    return appFetch(req).then(() => {
      toastr.success('template created');
      window.reactRouterHistory.push('/templates');
    });
  };
}

function fetchTemplatesRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/templates`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    return appFetch(req).then(res => {
      dispatch(fetchTemplatesSuccess(res.templates));
    });
  };
}

function fetchTemplatesSuccess(templates) {
  return { type: actionTypes.FETCH_TEMPLATES_SUCCESS, templates };
}

function fetchTemplateRequest(id) {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/templates/${id}`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    return appFetch(req).then(res => {
      dispatch(fetchTemplateSuccess(res.template, res.events));
    });
  };
}

function fetchTemplateSuccess(template, events) {
  return { type: actionTypes.FETCH_TEMPLATE_SUCCESS, template, events };
}

function deleteTemplateRequest(id) {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/templates/${id}`,
      Object.assign(requestParams, { method: 'DELETE', body: null })
    );

    return appFetch(req).then(() => {
      dispatch(deleteTemplateSuccess());
    });
  };
}

function deleteTemplateSuccess() {
  return dispatch => {
    toastr.success('template deleted');
    window.reactRouterHistory.push('/templates');
    dispatch(fetchTemplatesRequest());
  };
}

export default {
  createTemplateRequest,
  fetchTemplatesRequest,
  fetchTemplateRequest,
  deleteTemplateRequest
};
