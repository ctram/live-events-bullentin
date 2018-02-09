import toastr from 'toastr';

function betterFetch(req) {
  return fetch(req).then(res => {
    return res
      .json()
      .then(json => {
        const { msg } = json;
        res.ok ? toastr.success(msg) : toastr.error(msg);
      })
      .catch(e => console.error('response body is not json:', e))
      .then(() => res);

  });
}

export default betterFetch;
