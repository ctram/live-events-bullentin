let port;
let host;
let serverUrl;
let authenticate;

if (process.env.ENVIRONMENT === 'production') {
  port = process.env.PORT;
  host = process.env.HOST;
  serverUrl = `${host}`;
  authenticate = true;
} else if (process.env.ENVIRONMENT === 'development') {
  port = 3000;
  host = 'http://localhost';
  serverUrl = `${host}:${port}`;
  authenticate = false;
}

export default {
  port,
  host,
  serverUrl,
  authenticate
};
