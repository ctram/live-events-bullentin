const environment = process.env.ENVIRONMENT || 'development';

let port;
let host;
let serverUrl;
let env;

if (environment === 'production') {
  port = process.env.PORT;
  host = process.env.HOST;
  serverUrl = `${host}`;
  env = 'production';
} else if (environment === 'development') {
  port = 3000;
  host = 'http://localhost';
  serverUrl = `${host}:${port}`;
  env = 'development';
}

export default {
  port,
  host,
  serverUrl,
  authenticate: true,
  quickLogIn: true,
  env
};
