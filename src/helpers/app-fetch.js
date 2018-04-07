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
        const msg = data.msg || statusText || 'Unknown error';
        toastr.error(msg);
        throw msg;
      }

      return data;
    });
}
