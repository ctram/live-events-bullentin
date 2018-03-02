exports.up = knex => {
  return knex.schema
    .createTableIfNotExists('templates', table => {
      table.increments('id').primary();
      table.string('name');
      table.string('selector');
    })
    .catch(console.error);
};

exports.down = knex => {
  return knex.schema
    .hasTable('templates')
    .then(() => {
      return knex.schema.dropTable('templates');
    })
    .catch(console.error);
};
