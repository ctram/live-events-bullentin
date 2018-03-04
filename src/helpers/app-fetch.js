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
  let response;
  
  return fetch(req)
    .then(res => {
      status = res.status;
      response = res;
      if (status === 401) {
        toastr.error('Not Authorized');
        return {};
      }
      
      return getJson(res);
    })
    .then(json => {
      response;
      
      if (json && json.msg) {
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
