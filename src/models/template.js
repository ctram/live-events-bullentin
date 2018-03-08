import Backbone from 'backbone';

export default class Template extends Backbone.Model {
  constructor() {
    super();
  }

  defaults() {
    return {
      events: []
    };
  }
}
