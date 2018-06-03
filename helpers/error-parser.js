export function clientParseError(e) {
  if (e.responseJSON) {
    const { msg } = e.responseJSON;
    const errorMsg = msg.map(m => {
      return m + '<br/>';
    });
    return errorMsg.join(' ');
  }
  return 'There was an error on the server';
}

export function serverParseError(e) {
  if (Array.isArray(e)) {
    return e;
  }

  const { errors } = e;

  if (typeof e === 'string') {
    return [e];
  }
  if (e.msg) {
    return [e.msg];
  }
  if (errors && errors.length > 0) {
    return errors.map(error => error.message);
  }
  return ['There was an error'];
}
