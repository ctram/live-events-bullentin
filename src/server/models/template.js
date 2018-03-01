const Base = require('./base');

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
    const { templateName: name, templateSelector: selector } = data;
    const templates = Template.query();

    return templates
      .where({ name })
      .then(rows => {
        if (rows.length > 1) {
          return { msg: 'template of name already exists', status: 400 };
        } else {
          return templates.insert({ name, selector }).then(template => {
            return { id: template.id, name: template.name, selector: template.selector };
          });
        }
      })
      .catch(e => {
        console.error(e);
        return { msg: e, status: 500 };
      });
  }
}

module.exports = Template;
