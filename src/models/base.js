import knex from '../knex-helpers';
import { Model } from 'objection';
Model.knex(knex);

export default class Base extends Model {}
