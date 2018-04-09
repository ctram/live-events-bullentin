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

    appFetch(req).then(() => {
      toastr.success('Template created');
      window.LEB.reactRouterHistory.push('/templates');
    });
  };
}

function saveTemplateRequest(data) {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/templates/${data.id}?include[]=events`,
      Object.assign(requestParams, { method: 'PATCH', body: JSON.stringify(data) })
    );
    delete data.templateId;

    appFetch(req).then(({ template }) => {
      toastr.success('Template saved');
      dispatch(saveTemplateSuccess(template));
    });
  };
}

function saveTemplateSuccess(template) {
  return { type: actionTypes.SAVE_TEMPLATE_SUCCESS, template };
}

function fetchTemplatesRequest() {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/templates`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    appFetch(req).then(res => {
      dispatch(fetchTemplatesSuccess(res.templates));
    });
  };
}

function fetchTemplatesSuccess(templates) {
  return { type: actionTypes.FETCH_TEMPLATES_SUCCESS, templates };
}

function fetchTemplateRequest(id, opts = {}) {
  return dispatch => {
    const { include } = opts;
    let query = '';

    // build query
    if (include && include.length) {
      query += '?';
      include.forEach((element, idx) => {
        if (idx > 0) {
          query += `&`;
        }
        query += `include[]=${element}`;
      });
    }

    const req = new Request(
      appConfig.urlDomain + `/api/templates/${id}${query}`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    appFetch(req)
      .then(res => {
        dispatch(fetchTemplateSuccess(res.template));
      })
      .catch(e => {
        dispatch(fetchTemplateFailure(id, e));
      });
  };
}

function fetchTemplateFailure(id, msg) {
  return { type: actionTypes.FETCH_TEMPLATE_FAILURE, id, msg };
}

function fetchTemplateSuccess(template, events) {
  return { type: actionTypes.FETCH_TEMPLATE_SUCCESS, template, events, id: template.id };
}

function deleteTemplateRequest(id) {
  return dispatch => {
    const req = new Request(
      appConfig.urlDomain + `/api/templates/${id}`,
      Object.assign(requestParams, { method: 'DELETE', body: null })
    );

    appFetch(req).then(() => {
      dispatch(deleteTemplateSuccess());
    });
  };
}

function deleteTemplateSuccess() {
  return dispatch => {
    toastr.success('Template deleted');
    window.LEB.reactRouterHistory.push('/templates');
    dispatch(fetchTemplatesRequest());
  };
}

export default {
  createTemplateRequest,
  saveTemplateRequest,
  fetchTemplatesRequest,
  fetchTemplateRequest,
  deleteTemplateRequest
};
