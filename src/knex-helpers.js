const knex = require('knex');
// TODO: rename file

module.exports = knex({
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: 'localhost',
    user: 'chris',
    password: '',
    database: 'live_events_bulletin',
    port: 5432
  }
});