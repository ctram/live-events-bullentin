exports.up = knex => {
  return knex.schema
    .createTableIfNotExists('users', table => {
      table.increments('id').primary();
      table.string('username');
      table.string('password');
    })
    .catch(console.error);
};

exports.down = knex => {
  return knex.schema
    .hasTable('users')
    .then(() =>  {
      return knex.schema.dropTable('users');
    })
    .catch(console.error);
};