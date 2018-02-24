// Used to create migrations in CLI. Does not affect live server.
module.exports = { 
  development: { 
    client: 'pg', 
    connection: { 
      host: 'localhost', 
      port: 5432, 
      user: 'chris', 
      password: '',
      database: 'live_events_bulletin' 
    } 
  } 
 
  // staging: { 
  //   client: 'postgresql', 
  //   connection: { 
  //     database: 'my_db', 
  //     user:     'username', 
  //     password: 'password' 
  //   }, 
  //   pool: { 
  //     min: 2, 
  //     max: 10 
  //   }, 
  //   migrations: { 
  //     tableName: 'knex_migrations' 
  //   } 
  // }, 
 
  // production: { 
  //   client: 'postgresql', 
  //   connection: { 
  //     database: 'my_db', 
  //     user:     'username', 
  //     password: 'password' 
  //   }, 
  //   pool: { 
  //     min: 2, 
  //     max: 10 
  //   }, 
  //   migrations: { 
  //     tableName: 'knex_migrations' 
  //   } 
  // } 
}; 