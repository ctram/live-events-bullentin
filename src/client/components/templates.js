import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsTemplates from '../actions/templates';

function TemplatesList({templates}) {
  return (
    <section>
      <h1>Templates</h1>
      <ul>
        {templates.map((template, idx) => {
          return (
            <li key={idx}>
              <a href={`/templates/${template.id}`}>{template.name}</a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export class Templates extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchTemplatesRequest();
  }

  render() {
    const { templates = [], loggedin } = this.props;

    return (
      <div>
        <section>
          <Link to="/templates/new">
            <button className="btn btn-primary" disabled={!loggedin}>
              Add Template
            </button>
          </Link>
        </section>
        {templates.length > 0 && (
          <div>
            <hr />
            <TemplatesList templates={templates} />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign({}, state.storeTemplates, state.storeUsers);
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTemplatesRequest: () => {
      dispatch(actionsTemplates.fetchTemplatesRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
