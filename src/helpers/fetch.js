import toastr from 'toastr';

function redirect(res) {}

function ok() {}

function error() {}

function fetch(req) {
  return fetch(req).then(res => {
    if (res.redirected) {
      return redirect(res.url);
    } else if (res.ok) {
      return ok(res);
    } else if (res.status >= 500) {
      return error(res);
    }

    return Promise.resolve();
  });
}

export default fetch;
