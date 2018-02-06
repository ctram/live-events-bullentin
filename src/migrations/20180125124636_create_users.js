exports.up = function(knex, Promise) {
  async function main() {
    await knex.schema.createTableIfNotExists('users', table => {
      console.log(table)
      table.increments('id').primary();
      table.string('username');
      table.string('password');
    });
  }

  return main().catch(console.error);
};

exports.down = function(knex, Promise) {
  async function main() {
    await knex.schema.hasTable('users').then(function(exists) {
      return knex.schema.dropTable('users');
    });
  }

  return main().catch(console.error);
};
