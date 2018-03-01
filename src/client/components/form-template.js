import React from 'react';
import _ from 'underscore';
import toastr from 'toastr';
import { connect } from 'react-redux';
import actionsTemplates from '../actions/templates';

export class FormTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      templateName: '',
      templateSelector: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { templateName, templateSelector } = this.state;

    if (_.isEmpty(templateName) || _.isEmpty(templateSelector)) {
      toastr.error('Name and Selector required');
      return;
    }

    this.props.createTemplateRequest({ templateName, templateSelector });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      templateName: this.refs.inputTemplateName.value,
      templateSelector: this.refs.inputTemplateSelector.value
    });
  }

  render() {
    const { templateName, templateSelector } = this.state;

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
          />
        </fieldset>
        <button className="btn btn-primary" onClick={this.handleSubmit}>
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
