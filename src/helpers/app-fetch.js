import toastr from 'toastr';

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

function appFetch(req) {
  let status;

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
    });
}
export default appFetch;
