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

function ok(res) {
  return getJson(res).then(data => {
    toastr.success(data.msg);
    return data;
  });
}

function error(res) {
  return getJson(res).then(data => {
    toastr.error(data.msg || 'unknown error');
    return data;
  });
}

function appFetch(req) {
  return fetch(req)
    .then(res => {
      // eslint-disable-next-line no-console
      

      if (res.ok) {
        return ok(res);
      } else if (res.status >= 400) {
        return error(res);
      }

      return Promise.resolve();
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.error('appFetch error:', e);
    });
}

export default appFetch;
