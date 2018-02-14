import toastr from 'toastr';

function redirect(url) {
  debugger
  // dispatch(actionsRoot.redirect(url));
  const appHost = 'http://localhost:3000';
  const path = url.split(appHost)[1];
  url = path ? path : url;

  window.reactRouterHistory.push(url);
  return Promise.resolve();
}

function getMsg(res) {
  return res
    .json()
    .then(json => {
      return json.msg;
    })
    .catch(e => {
      toastr.error(e);
      // eslint-disable-next-line no-console
      console.error(e);
    });
}

function ok(res) {
  return getMsg(res).then(msg => {
    toastr.success(msg);
  });
}

function error(res) {
  return getMsg(res).then(msg => {
    toastr.error(msg);
  });
}

function appFetch(req, dispatch) {
  return fetch(req).then(res => {
    // eslint-disable-next-line no-console
    console.log('fetched:', res);

    if (res.redirected) {
      return redirect(res.url, dispatch);
    } else if (res.ok) {
      return ok(res);
    } else if (res.status >= 500) {
      return error(res);
    }

    return Promise.resolve();
  });
}

export default appFetch;
