const environment = process.env.ENVIRONMENT || 'development';

let port;
let host;

if (environment === 'production') {
  port = process.env.PORT;
  host = process.env.HOST;
} else if (environment === 'development') {
  port = 3000;
  host = 'http://localhost';
}

export default {
  port,
  host,
  serverUrl: `${host}:${port}`,
  authenticate: false
};
