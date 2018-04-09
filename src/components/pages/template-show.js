import React from 'react';
import { connect } from 'react-redux';
import actionsTemplates from '../../actions/templates';
// eslint-disable-next-line no-unused-vars
import FormTemplate from '../form-template';
import Template from '../../models/template';

// eslint-disable-next-line no-unused-vars
function Event({ event }) {
  return <div>{event}</div>;
}

export class PageTemplateShow extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { fetchTemplateRequest, fetchTemplateEventsRequest } = this.props;
    let { template } = this.props;
    const { location } = window.LEB.reactRouterHistory;
    const templateId = location.pathname.split('/')[2];

    // Template is from server, no need to fetch it again.
    if (template.id) {
      return;
    }

    // fetch template from server with events.
    fetchTemplateRequest(templateId).then(() => {
      if (!template.get('events')) {
        fetchTemplateEventsRequest(templateId);
      }
    });
  }

  render() {
    const { template } = this.props;
    const events = template.get('events');
    const error = template.get('error');
    let domList;
    if (error) {
      domList = error;
    } else if (!events) {
      domList = 'No events found';
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
          <h1>{template.get('name')}</h1>
          <FormTemplate template={template} isNew={!template.id} />
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
  const { templates } = state.storeTemplates;
  const templateId = window.LEB.reactRouterHistory.location.pathname.split('/')[2];
  const template = templates.get(templateId) || new Template();
  return Object.assign({}, { template });
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTemplateRequest: id => {
      return dispatch(actionsTemplates.fetchTemplateRequest(id));
    },
    fetchTemplateEventsRequest: id => {
      dispatch(actionsTemplates.fetchTemplateEventsRequest(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTemplateShow);
