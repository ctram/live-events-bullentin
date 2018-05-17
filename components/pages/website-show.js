import React from 'react';
import { connect } from 'react-redux';
import actionsWebsites from '../../actions/websites';
// eslint-disable-next-line no-unused-vars
import FormWebsite from '../form-website';
import Website from '../../backbone/models/website';
import _ from 'underscore';

// eslint-disable-next-line no-unused-vars
function Event({ event }) {
  return <div>{event}</div>;
}

export class PageWebsiteShow extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { fetchWebsiteRequest, fetchWebsiteEventsRequest } = this.props;
    let { website } = this.props;
    const { location } = window.LEB.reactRouterHistory;
    const websiteId = location.pathname.split('/')[2];

    return fetchWebsiteRequest(websiteId).then(() => {
      if (!website.get('events')) {
        return fetchWebsiteEventsRequest(website);
      }
    });
  }

  render() {
    const { website } = this.props;
    const events = website.get('events');
    const error = website.get('error');
    let domList;
    if (error) {
      domList = error;
    } else if (_.isEmpty(events)) {
      domList = (
        <p>There are no events on the page or the page is preventing scraping.</p>
      );
    } else {
      domList = (
        <div className="row justify-content-center">
          <ul className="col-6">
            {events &&
              events.map((event, idx) => {
                return (
                  <li className="event-item" key={idx}>
                    <Event event={event} />
                  </li>
                );
              })}
          </ul>
        </div>
      );
    }

    return (
      <div>
        <section>
          <h1>{website.get('name')}</h1>
          <FormWebsite website={website} isNew={!website.id} />
        </section>
        <hr />
        <section className="text-center">
          <h1>Events</h1>
          {domList}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { websites } = state.storeWebsites;
  const websiteId = window.LEB.reactRouterHistory.location.pathname.split('/')[2];
  const website = websites.get(websiteId) || new Website();
  return Object.assign({}, { website });
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWebsiteRequest: id => {
      return dispatch(actionsWebsites.fetchWebsiteRequest(id));
    },
    fetchWebsiteEventsRequest: id => {
      dispatch(actionsWebsites.fetchWebsiteEventsRequest(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageWebsiteShow);
