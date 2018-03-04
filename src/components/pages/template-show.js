import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsTemplates from '../../actions/templates';
import FormTemplate from '../form-template';
import Template from '../../models/template'

function Event({ event }) {
  return <div>{event}</div>;
}

export class TemplateEdit extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { template, location } = this.props;
    const templateId = location.pathname.split('/')[2];
    if (!template.id) {
      this.props.fetchTemplateRequest(templateId);
    }
  }

  render() {
    const { template } = this.props;
    const mock = [];

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
            {mock.map((event, idx) => {
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

const mapStateToProps = (state, ownProps) => {
  const { location } = ownProps;
  const { templates } = state.storeTemplates;
  const templateId = location.pathname.split('/')[2];
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEdit);
