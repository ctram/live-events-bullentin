const Base = require('./base');
const scrapeIt = require('scrape-it');

class Template extends Base {
  static get tableName() {
    return 'templates';
  }

  static get jsonSchema() {
    return {
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        selector: { type: 'string' }
      }
    };
  }

  static create(data) {
    const { name, selector, url } = data;
    const templates = Template.query();

    return templates.where({ name }).then(rows => {
      if (rows.length > 1) {
        return { msg: 'Template of name already exists', status: 400 };
      } else {
        return templates.insert({ name, selector, url }).then(template => {
          return {
            id: template.id,
            name: template.name,
            selector: template.selector,
            url: template.url
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

module.exports = Template;
