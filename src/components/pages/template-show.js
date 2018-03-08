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
    const location = window.reactRouterLocation;
    const templateId = location.pathname.split('/')[2];
    if (!template.id) {
      this.props.fetchTemplateRequest(templateId);
    }
  }

  render() {
    const { template } = this.props;
    let events = template.get('events') || [];

    return (
      <div>
        <section>
          <h1>{template.get('name')}</h1>
          <FormTemplate template={template} disabled={true} deletable={!!template.id} />
        </section>
        <hr />
        <section>
          <h1>Events</h1>
          <ul>
            {events.map((event, idx) => {
              return (
                <li key={idx}>
                  <Event event={event} />
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { templates } = state.storeTemplates;
  const templateId = window.reactRouterLocation.pathname.split('/')[2];
  const template = templates.get(templateId) || new Template();
  return Object.assign({}, { template });
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTemplateRequest: id => {
      dispatch(actionsTemplates.fetchTemplateRequest(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageTemplateShow);
