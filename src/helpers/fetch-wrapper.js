import toastr from 'toastr';

function fetchWithToastr(req) {
  return fetch(req).then(res => {
    if (!res.ok) {
      return res.json().then(json => {
        const { msg } = json;
        console.error(msg);
        toastr.error(msg);
        return res;
      });
    }
    return res.json().then(json => {
      const {msg} = json;
      console.log(msg);
      toastr.success(msg);
      return res;
    });
  });
}

export default fetchWithToastr;
