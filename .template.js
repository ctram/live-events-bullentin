const Base = require('./base');
const scrapeIt = require('scrape-it');

class Website extends Base {
  static get tableName() {
    return 'websites';
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        selector: { type: 'string' },
        role: { type: 'string' }
      }
    };
  }

  static create(data) {
    const { name, selector, url } = data;
    const websites = Website.query();

    return websites.where({ name }).then(rows => {
      if (rows.length > 1) {
        return { msg: 'Website of name already exists', status: 400 };
      } else {
        return websites.insert({ name, selector, url }).then(website => {
          return {
            id: website.id,
            name: website.name,
            selector: website.selector,
            url: website.url
          };
        });
      }
    });
  }

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

module.exports = Website;
