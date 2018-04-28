'use strict';
import sequelize from './sequelize';
import Sequelize from 'sequelize';
import scrapeIt from 'scrape-it';
import validator from 'validator';

const Base = sequelize.define(
  'website',
  {
    url: {
      type: Sequelize.STRING,
      validate: {
        stricterUrl(value) {
          if (!validator.isURL(value, { require_protocol: true })) {
            throw new Error('Invalid URL format');
          }
        }
      }
    },
    selector: Sequelize.STRING,
    name: Sequelize.STRING
  },
  { underscored: true }
);

export default class Website extends Base {
  getEvents() {
    let { url, selector } = this;

    return this.validate().then(() => {
      const opts = {
        events: {
          listItem: selector
        }
      };

      return scrapeIt(url, opts).then(({ data, response: { statusCode } }) => {
        console.log('statuscode', statusCode);
        if (statusCode && statusCode >= 400) {
          throw { msg: `Error finding any events`, statusCode };
        }
        if (data && data.events) {
          return data.events;
        }
        throw `Unknown error scrapping events`;
      });
    });
  }
}
