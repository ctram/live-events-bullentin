import Backbone from 'backbone';
import requestParams from '../../helpers/request-params';
import _ from 'underscore';

export default class Website extends Backbone.Model {
  urlRoot() {
    return `${window.LEB.appConfig.serverUrl}/api/websites`;
  }

  parse(res) {
    const website = res.website || res;
    const { id, selector, url, name } = website;
    return { id, selector, url, name };
  }

  validate(attrs) {
    const { name, url, selector } = attrs;
    if (_.isEmpty(name) || _.isEmpty(url) || _.isEmpty(selector)) {
      return 'Name, URL, and Selector must not be empty';
    }
  }

  fetchEvents() {
    const req = new Request(
      window.LEB.appConfig.serverUrl + `/api/websites/${this.id}/events`,
      Object.assign(requestParams, { method: 'GET', body: null })
    );

    return fetch(req)
      .then(res => res.json())
      .then(({ events }) => {
        this.set('events', events);
        return events;
      });
  }
}
