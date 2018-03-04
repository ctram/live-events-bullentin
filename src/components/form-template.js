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
      templateUrl: template.get('url') || ''
    };
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { templateName, templateSelector, templateUrl } = this.state;

    if (_.isEmpty(templateName) || _.isEmpty(templateUrl) || _.isEmpty(templateSelector)) {
      toastr.error('Name, URL and Selector required');
      return;
    }

    this.props.createTemplateRequest({ templateName, templateUrl, templateSelector });
  }

  delete(e) {
    e.preventDefault();
    const { deleteTemplateRequest, template } = this.props;
    deleteTemplateRequest(template.id);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      templateName: this.refs.inputTemplateName.value,
      templateUrl: this.refs.inputTemplateUrl.value,
      templateSelector: this.refs.inputTemplateSelector.value
    });
  }

  render() {
    const { templateName, templateSelector, templateUrl } = this.state;
    const { disabled, deletable } = this.props;

    ;

    return (
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
            disabled={disabled}
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
            disabled={disabled}
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
            disabled={disabled}
          />
        </fieldset>

        {!deletable &&
          <button className="btn btn-primary" onClick={this.submit} disabled={disabled}>
            Add Template
          </button>
        }
        
        {deletable && (
          <button className="btn btn-danger" onClick={this.delete}>
            Delete
          </button>
        )}
      </form>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(state.loader, state.root, state.storeUsers);
};

const mapDispatchToProps = dispatch => {
  return {
    createTemplateRequest: data => {
      dispatch(actionsTemplates.createTemplateRequest(data));
    },
    deleteTemplateRequest: id => {
      dispatch(actionsTemplates.deleteTemplateRequest(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormTemplate);
