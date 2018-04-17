console.log('environment', process.env);
// const port = process.env.PORT || 3000;
// const host = process.env.HOST || 'http://localhost';
const config = {};
const defaultConfig = {
  port: 3000,
  host: 'http://localhost',
  authenticate: false
};

config.urlDomain = `${config.host}:${config.port}`;

export function setServerDetails({ port = defaultConfig.port, host = defaultConfig.host, authenticate = defaultConfig.authenticate }) {
  config.port = port;
  config.host = host;
  config.urlDomain = `${host}:${port}`;
  config.authenticate = authenticate;

  console.log('config on client after set', config);
}

export default config;
