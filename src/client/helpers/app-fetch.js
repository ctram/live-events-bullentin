import toastr from 'toastr';

function getJson(res) {
  return res
    .json()
    .then(json => {
      return json;
    })
    .catch(e => {
      console.error('json parsing error:', e);
    });
}

function appFetch(req) {
  let status;

  return fetch(req)
    .then(res => {
      status = res.status;
      return getJson(res);
    })
    .then(json => {
      if (json.redirectUrl) {
        window.reactRouterHistory.push(json.redirectUrl);
      }

      if (json.msg) {
        if (status >= 200 && status < 400) {
          toastr.success(json.msg);
        } else if (status >= 400) {
          toastr.error(json.msg || 'unknown error');
        }
      }

      return json;
    });
}
export default appFetch;
