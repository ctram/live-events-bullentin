export default function parseError(e) {
  if (e.responseJSON) {
    const { msg } = e.responseJSON;
    const errorMsg = msg.map(m => {
      return m + '<br/>';
    });
    return errorMsg.join(' ');
  }
  return 'There was an error on the server';
}
