exports.up = function(knex) {
  return knex.schema
    .table('users', table => {
      table.string('email');
    })
    .catch(err => console.error(err));
};

exports.down = function(knex) {
  return knex.schema
    .table('users', table => {
      table.dropColumn('email');
    })
    .catch(err => console.error(err));
};
