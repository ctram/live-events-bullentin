const knex = require('./src/knex-helpers');
const User = require('./src/models/user');

const hank = { username: 'hasdnk', password: 'hasdnk' };
knex
  .insert(hank)
  .into('users')
  .catch(err => console.log(err));

knex
  .select('*')
  .from('users')
  .then(row => {
    console.log(row);
  });

knex('users')
  .columnInfo()
  .then(function(info) {
    console.log(info);
  });

knex.destroy();
// module.exports = {User, knex};
