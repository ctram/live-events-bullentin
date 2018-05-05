export function translateErrors(e) {
  if (Array.isArray(e)) {
    return e;
  }
  
  const { errors } = e;
  
  if (e.msg) {
    return [e.msg];
  }
  if (errors && errors.length > 0) {
    return errors.map(error => error.message);
  }
  return ['There was an error'];
}
