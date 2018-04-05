import toastr from 'toastr';
import loader from '../actions/loader';

let _dispatch = () => {};

function parseResponse(res) {
  return res
    .json()
    .then(json => {
      return json;
    })
    .catch(e => {
      console.error('json parsing error:', e);

      return res.text();
    });
}

export function setDispatchForAppFetch(dispatch) {
  _dispatch = dispatch;
}

export default function appFetch(req) {
  let status;

  _dispatch(loader.startLoading());
  return fetch(req)
    .then(res => {
      status = res.status;
      if (status === 401) {
        toastr.error('Not Authorized');
        return {};
      }

      return parseResponse(res);
    })
    .then(res => {
      if (res && res.msg) {
        if (status >= 200 && status < 400) {
          toastr.success(res.msg);
        } else if (status >= 400) {
          toastr.error(res.msg || 'unknown error');
          throw res.msg;
        }
      }

      return res;
    })
    .catch(e => {
      console.error(e);
      toastr.error(e);
    })
    .then(res => {
        _dispatch(loader.endLoading());
      return res;
    });
}
