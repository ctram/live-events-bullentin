import _knex from 'knex';

export default {
  knex: _knex({
    client: 'pg',
    useNullAsDefault: true,
    connection: {
      host: 'localhost',
      user: 'chris',
      database: 'live_events_bulletin',
      port: 5432
    }
  })
};
