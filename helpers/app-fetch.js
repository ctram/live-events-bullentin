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
      return { statusText: res.statusText, status: res.status };
    });
}

export function setDispatchForAppFetch(dispatch) {
  _dispatch = dispatch;
}

export default function appFetch(req) {
  _dispatch(loader.startLoading());

  return fetch(req)
    .then(res => {
      return parseResponse(res).then(body => {
        return { data: body, statusText: res.statusText, status: res.status };
      });
    })
    .catch(e => {
      console.error(e);
      toastr.error(e);
      _dispatch(loader.endLoading());
      throw e;
    })
    .then(({ data, statusText, status }) => {
      _dispatch(loader.endLoading());

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
          errorMsg = data.msg + '; ';
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
    });
}
