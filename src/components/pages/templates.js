import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import actionsTemplates from '../../actions/templates';

function TemplatesList({templates}) {
  return (
    <section>
      <h1>Templates</h1>
      <ul>
        {templates.map((template, idx) => {
          return (
            <li key={idx} className="row">
              <Link to={`/templates/${template.id}`} className="col-6">{template.get('name')}</Link>
              <span className="col-1 offset-3">
                <i className="fas fa-trash" />
              </span>
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
    const { templates = [], loggedIn } = this.props;

    return (
      <div>
        <section>
          <Link to="/templates/new">
            <button className="btn btn-primary" disabled={!loggedIn}>
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
