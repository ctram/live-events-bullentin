export function translateErrors(e) {
  const { errors } = e;
  let errorMessages = ['There was an error'];

  if (errors && errors.length > 0) {
    errorMessages = errors.map(error => error.message);
  }

  return translateWebsiteValidationError(errorMessages);
}

export function translateWebsiteValidationError(errorMessages) {
  errorMessages = errorMessages.map(msg => {
    if (msg.includes('Validation isUrl')) {
      return 'URL must include a protocol prefix, i.e. "http://"';
    }
    return msg;
  });

  return errorMessages;
}
