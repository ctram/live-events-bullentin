const knex = require('../knex-helpers');
const { Model } = require('objection');
console.log('Model ', Model);
Model.knex(knex);

class Base extends Model {}

module.exports = Base;
