import Backbone from 'backbone';
import Website from '../models/website';

export default class Websites extends Backbone.Collection {
  get model() {
    return Website;
  }

  url() {
    return `api/websites`;
  }

  parse(res) {
    return res.websites;
  }
}
