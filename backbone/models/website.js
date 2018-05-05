import Backbone from 'backbone';
import appConfig from '../../app-config';
import requestParams from '../../helpers/request-params';

export default class Website extends Backbone.Model {
  urlRoot() {
    return `${appConfig.serverUrl}/api/websites`;
  }

  parse(res) {
    const { id, selector, url, name } = res.website;
    return { id, selector, url, name };
  }

  fetchEvents() {
    const req = new Request(
      appConfig.serverUrl + `/api/websites/${this.id}/events`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    return fetch(req).then(res => {
      this.set('events', res.events);
      return res.events;
    });
  }
}
