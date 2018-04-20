import Sequelize from 'sequelize';

export default new Sequelize('database', 'chris', null, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
