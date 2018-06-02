let port;
let host;
let serverUrl;

if (process.env.NODE_ENV === 'production') {
  port = process.env.PORT;
  host = process.env.HOST;
  serverUrl = `${host}`;
} else if (process.env.NODE_ENV === 'development') {
  port = 3000;
  host = 'http://localhost';
  serverUrl = `${host}:${port}`;
}

export default {
  port,
  host,
  serverUrl,
  authenticate: process.env.NODE_ENV === 'development' && false
};
