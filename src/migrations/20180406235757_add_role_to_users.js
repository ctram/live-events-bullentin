exports.up = knex => {
  return knex.schema
    .table('users', table => {
      table.string('role').defaultTo('standard').notNullable();
    })
    .catch(e => console.error(e));
};

exports.down = knex => {
  return knex.schema
    .table('users', table => {
      table.dropColumn('role');
    })
    .catch(e => console.error(e));
};
