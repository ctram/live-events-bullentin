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
    const { templateName: name, templateSelector: selector, templateUrl: url } = data;
    const templates = Template.query();

    return templates
      .where({ name })
      .then(rows => {
        if (rows.length > 1) {
          return { msg: 'template of name already exists', status: 400 };
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
      })
      .catch(e => {
        console.error(e);
        return { msg: e, status: 500 };
      });
  }

  getEvents() {
    let { url, selector } = this;
    // url = 'https://news.ycombinator.com/';
    // selector = '.title a';

    const opts = {
      events: {
        listItem: selector
      }
    };

    return scrapeIt(url, opts).then(({ data, response: { statusCode } }) => {
      if (data && data.events) {
        return data.events;
      }
      if (statusCode && statusCode >= 400) {
        throw `error scraping events, status code: ${statusCode}`;
      }
      throw `unknown error scrapping events`;
    });
  }
}

module.exports = Template;
