exports.up = knex => {
  return knex.schema
    .table('templates', table => {
      table.string('url');
    })
    .catch(e => console.error(e));
};

exports.down = knex => {
  return knex.schema
    .table('templates', table => {
      table.dropColumn('url');
    })
    .catch(e => console.error(e));
};
