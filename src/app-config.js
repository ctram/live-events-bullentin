const port = 3000;
const host = 'localhost';
console.log('env', process.env);

export default {
  port,
  host,
  urlDomain: `http://${host}:${port}`,
  authenticate: false
};
