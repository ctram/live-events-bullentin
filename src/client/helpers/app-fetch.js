import toastr from 'toastr';

function getJson(res) {
  return res
    .json()
    .then(json => {
      console.log('json:', json);
      return json;
    })
    .catch(e => {
      console.error('json parsing error:', e);
    });
}

function ok(res) {
  return getJson(res).then(data => {
    toastr.success(data.msg);

    // if (data.redirectUrl) {
    //   window.reactRouterHistory.push(data.redirectUrl);
    // }

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
      console.log('fetched:', res);

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
