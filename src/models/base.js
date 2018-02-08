const knex = require('../knex-helpers');
const { Model } = require('objection');
Model.knex(knex);

class Base extends Model {}

module.exports = Base;
