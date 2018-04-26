export function translateErrors(e) {
  const { errors } = e;
  let errorMessages = ['There was an error'];

  if (errors && errors.length > 0) {
    errorMessages = errors.map(error => error.message);
  }

  return errorMessages;
}