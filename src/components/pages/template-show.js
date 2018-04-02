import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsTemplates from '../../actions/templates';
import FormTemplate from '../form-template';
import Template from '../../models/template';

function Event({ event }) {
  return <div>{event}</div>;
}

export class PageTemplateShow extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { template } = this.props;
    const { location } = window.reactRouterHistory;
    const templateId = location.pathname.split('/')[2];
    let opts = {};

    if (!template.get('events')) {
      opts.include = ['events'];
    }
    if (!template.id || opts.include) {
      this.props.fetchTemplateRequest(templateId, opts);
    }
  }

  render() {
    const { template } = this.props;
    const events = template.get('events');
    const error = template.get('error');
    let domError;

    if (error) {
      domError = error;
    }

    const domList = (
      <ul>
        {events &&
          events.map((event, idx) => {
            return (
              <li key={idx}>
                <Event event={event} />
              </li>
            );
          })}
      </ul>
    );

    return (
      <div>
        <section>
          <h1>{template.get('name')}</h1>
          <FormTemplate template={template} disabled={true} deletable={!!template.id} />
        </section>
        <hr />
        <section className="text-center">
          <h1>Events</h1>
          {domError || domList}
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { templates } = state.storeTemplates;
  const templateId = window.reactRouterHistory.location.pathname.split('/')[2];
  const template = templates.get(templateId) || new Template();
  return Object.assign({}, { template });
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTemplateRequest: (id, opts) => {
      dispatch(actionsTemplates.fetchTemplateRequest(id, opts));
    },
    fetchTemplateEventsRequest: id => {
      dispatch(actionsTemplates.fetchTemplateEventsRequest(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTemplateShow);
