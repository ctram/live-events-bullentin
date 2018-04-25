'use strict';
import sequelize from './sequelize';
import Sequelize from 'sequelize';
import scrapeIt from 'scrape-it';

const Base = sequelize.define(
  'website',
  {
    url: Sequelize.STRING,
    selector: Sequelize.STRING,
    name: Sequelize.STRING
  },
  {}
);
// Website.associate = function(models) {
//   // associations can be defined here
// };

export default class Website extends Base {
  getEvents() {
    let { url, selector } = this;

    const opts = {
      events: {
        listItem: selector
      }
    };

    return scrapeIt(url, opts).then(({ data, response: { statusCode } }) => {
      console.log('statuscode', statusCode);
      if (statusCode && statusCode >= 400) {
        throw { msg: `Error scraping events`, statusCode };
      }
      if (data && data.events) {
        return data.events;
      }
      throw `Unknown error scrapping events`;
    });
  }
}
