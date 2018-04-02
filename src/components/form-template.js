import React from 'react';
import _ from 'underscore';
import toastr from 'toastr';
import { connect } from 'react-redux';
import actionsTemplates from '../actions/templates';

export class FormTemplate extends React.Component {
  constructor(props) {
    super(props);
    const { template } = props;

    this.state = {
      templateName: template.get('name') || '',
      templateSelector: template.get('selector') || '',
      templateUrl: template.get('url') || '',
      editMode: false
    };
    this.addTemplate = this.addTemplate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { templateSelector, templateName, templateUrl } = nextProps;
    this.setState({ templateSelector, templateName, templateUrl });
  }

  addTemplate(e) {
    e.preventDefault();
    const { templateName, templateSelector, templateUrl } = this.state;

    if (!this.validateForm()) {
      return;
    }

    this.props.createTemplateRequest({
      name: templateName,
      url: templateUrl,
      selector: templateSelector
    });
  }

  save(e) {
    e.preventDefault();
    const { templateName, templateSelector, templateUrl } = this.state;
    const { template } = this.props;

    if (!this.validateForm()) {
      return;
    }

    this.props.saveTemplateRequest({
      name: templateName,
      url: templateUrl,
      selector: templateSelector,
      id: template.id
    });
  }

  validateForm() {
    const { templateName, templateSelector, templateUrl } = this.state;

    if (_.isEmpty(templateName) || _.isEmpty(templateUrl) || _.isEmpty(templateSelector)) {
      toastr.error('Name, URL and Selector required');
      return false;
    }
    return true;
  }

  delete(e) {
    e.preventDefault();
    const { deleteTemplateRequest, template } = this.props;
    deleteTemplateRequest(template.id);
  }

  edit(e) {
    e.preventDefault();
    this.setState({ editMode: true });
  }

  cancel(e) {
    e.preventDefault();
    this.setState({ editMode: false });
  }

  handleChange(e) {
    e.preventDefault();
    const { value, name } = e.target;
    const element = `template${name.charAt(0).toUpperCase() + name.slice(1)}`;
    const state = {};
    state[element] = value;
    this.setState(state);
  }

  render() {
    const { templateName, templateSelector, templateUrl } = this.state;
    const { isNew } = this.props;
    const { editMode } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-4">
          <form>
            <fieldset className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                className="form-control"
                id="name"
                value={templateName}
                onChange={this.handleChange}
                ref="inputTemplateName"
                disabled={!editMode}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="url">URL</label>
              <input
                name="url"
                className="form-control"
                id="url"
                value={templateUrl}
                onChange={this.handleChange}
                ref="inputTemplateUrl"
                disabled={!editMode}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="selector">Selector</label>
              <input
                name="selector"
                className="form-control"
                id="selector"
                value={templateSelector}
                onChange={this.handleChange}
                ref="inputTemplateSelector"
                disabled={!editMode}
              />
            </fieldset>
            <div className="btn-group">
              {isNew && (
                <button className="btn btn-primary" onClick={this.addTemplate}>
                  Add Template
                </button>
              )}
              {!isNew &&
                editMode && (
                  <button className="btn btn-primary" onClick={this.save}>
                    Save
                  </button>
                )}
              {!isNew &&
                !editMode && (
                  <button className="btn btn-secondary" onClick={this.edit}>
                    Edit
                  </button>
                )}
              {!isNew &&
                editMode && (
                  <button className="btn btn-secondary" onClick={this.cancel}>
                    Cancel
                  </button>
                )}
              {!isNew && (
                <button className="btn btn-danger" onClick={this.delete} disabled={editMode}>
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { template } = ownProps;

  const templateName = template.get('name');
  const templateUrl = template.get('url');
  const templateSelector = template.get('selector');
  return Object.assign(state.loader, state.root, state.storeUsers, {
    templateName,
    templateUrl,
    templateSelector
  });
};

const mapDispatchToProps = dispatch => {
  return {
    createTemplateRequest: data => {
      dispatch(actionsTemplates.createTemplateRequest(data));
    },
    deleteTemplateRequest: id => {
      dispatch(actionsTemplates.deleteTemplateRequest(id));
    },
    saveTemplateRequest: data => {
      dispatch(actionsTemplates.saveTemplateRequest(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormTemplate);
