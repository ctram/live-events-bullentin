export function saveRequestErrorMessage(e) {
  const { errors } = e;
  let msg;
  if (errors && errors[0]) {
    msg = errors[0].message;
  } else {
    msg = e.name || 'Error saving website data';
  }

  if (msg.includes('Validation isUrl')) {
    msg = 'URL must include a protocol prefix, i.e. "http://"';
  }
  return msg;
}
