let port;
let host;
let serverUrl;

console.log('environment', process.env.ENVIRONMENT);
console.log('process env', process.env);

if (process.env.ENVIRONMENT === 'production') {
  port = process.env.PORT;
  host = process.env.HOST;
  serverUrl = `${host}`;
} else if (process.env.ENVIRONMENT === 'development') {
  port = 3000;
  host = 'http://localhost';
  serverUrl = `${host}:${port}`;
}

export default {
  port,
  host,
  serverUrl,
  authenticate: (process.env.ENVIRONMENT === 'development' && true) || true
};
