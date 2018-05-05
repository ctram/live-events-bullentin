import Backbone from 'backbone';
import appConfig from '../../app-config';
import Website from '../models/website';

export default class Websites extends Backbone.Collection {
  get model() {
    return Website;
  }

  url() {
    return `${appConfig.serverUrl}/api/websites`;
  }

  parse(res) {
    return res.websites;
  }
}
