const environment = process.env.ENVIRONMENT || 'development';

let port;
let host;
let serverUrl;

if (environment === 'production') {
  port = process.env.PORT;
  host = process.env.HOST;
  serverUrl = `${host}`;
} else if (environment === 'development') {
  port = 3000;
  host = 'http://localhost';
  serverUrl = `${host}:${port}`;
}

export default {
  port,
  host,
  serverUrl,
  authenticate: false
};
