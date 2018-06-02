'use strict';
import sequelize from './sequelize';
import Sequelize from 'sequelize';
import scrapeIt from 'scrape-it';
import validator from 'validator';

const Website = sequelize.define(
  'website',
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
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
    name: Sequelize.STRING,
    user_id: { type: Sequelize.UUID, allowNull: false },
    view_permission: Sequelize.STRING
  },
  { underscored: true }
);

// TODO: cache the results by week or day.
Website.prototype.getEvents = function() {
  let { url, selector } = this;

  return this.validate()
    .then(() => {
      const opts = {
        events: {
          listItem: selector
        }
      };
      return scrapeIt(url, opts);
    })
    .then(({ data, response: { statusCode } }) => {
      if (statusCode && statusCode >= 400) {
        throw { msg: `Error finding any events`, statusCode };
      }
      if (data && data.events) {
        return data.events;
      }
      throw `Error finding events`;
    });
};

export default Website;
