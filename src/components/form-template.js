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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { templateName, templateSelector, templateUrl } = this.state;

    if (_.isEmpty(templateName) || _.isEmpty(templateUrl) || _.isEmpty(templateSelector)) {
      toastr.error('Name, URL and Selector required');
      return;
    }

    this.props.createTemplateRequest({ templateName, templateUrl, templateSelector });
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
    const { disabled } = this.props;

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
          <label htmlFor="url">Url</label>
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
        <button className="btn btn-primary" onClick={this.handleSubmit} disabled={disabled}>
          Add Template
        </button>
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormTemplate);
