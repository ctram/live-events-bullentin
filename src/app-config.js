const environment = process.env.NODE_ENV || 'development';

console.log('node_env', process.env.NODE_ENV);

let port;
let host;

if (environment === 'production') {
  port = null;
  host = '';
} else if (environment === 'development') {
  port = 3000;
  host = 'http://localhost';
}

function serverUrl() {
  return `${host}:${port}`;
}

export default {
  port,
  host,
  serverUrl: serverUrl()
};
