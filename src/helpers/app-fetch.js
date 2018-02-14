import toastr from 'toastr';

function redirect(res) {
  const appHost = 'http://localhost:3000';
  const path = res.url.split(appHost)[1];
  const url = path ? path : res.url;

  return toastMsg(res).then(() => window.reactRouterHistory.push(url));
}

function toastMsg(res) {
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
  return toastMsg(res).then(msg => {
    toastr.success(msg);
  });
}

function error(res) {
  return toastMsg(res).then(msg => {
    toastr.error(msg);
  });
}

function appFetch(req) {
  return fetch(req).then(res => {
    // eslint-disable-next-line no-console
    console.log('fetched:', res);

    if (res.redirected) {
      return redirect(res);
    } else if (res.ok) {
      return ok(res);
    } else if (res.status >= 500) {
      return error(res);
    }

    return Promise.resolve();
  });
}

export default appFetch;
