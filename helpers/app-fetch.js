import toastr from 'toastr';
import loader from '../actions/loader';

let _dispatch = () => {};

/**
 * @function parseResponse
 * @param {Response Object} res
 * @return {Promise}
 * Attempts to parse the response as JSON, otherwise returns the status message.
 */
function parseResponse(res) {
  return res
    .json()
    .then(json => {
      return json;
    })
    .catch(e => {
      console.error('json parsing error:', e);
      return { statusText: res.statusText, status: res.status };
    });
}

/**
 * @function setDispatchForAppFetch
 * @param {function} dispatch
 * Sets a reference to the dispatch, so that appFetch may utilize the loader utility.
 */
export function setDispatchForAppFetch(dispatch) {
  _dispatch = dispatch;
}

/**
 * @function appFetch
 * @param {Request object} req 
 * @return {Promise}
 * Extends the native fetch function to toast success and failure messages within
 * the response; also triggers the loading utility while the fetch is in progress.
 */
export default function appFetch(req) {
  _dispatch(loader.startLoading());
  let res;

  return fetch(req)
    .then(_res => {
      res = _res;
      return parseResponse(res);
    })
    .then(body => {
      const data = body;
      const { statusText, status } = res;

      if (status >= 100 && status < 200) {
        data.msg ? toastr.info(data.msg) : null;
        return data;
      }
      if (status >= 200 && status < 400) {
        data.msg ? toastr.success(data.msg) : null;
        return data;
      }
      if (status >= 400) {
        let errorMsg;

        if (data.msg) {
          errorMsg = data.msg;
        }

        if (data.errors && data.errors.length > 0) {
          data.errors.forEach(error => {
            errorMsg += error.message + '; ';
          });
        }

        const msg = errorMsg || statusText || 'Unknown error';
        toastr.error(msg);
        throw msg;
      }

      return data;
    })
    .finally(() => _dispatch(loader.endLoading()));
}
