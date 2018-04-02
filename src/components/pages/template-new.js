import React from 'react';
import _ from 'underscore';
import FormTemplate from '../form-template';
import Template from '../../models/template';

export default class PageTemplateNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="row">
        <h1>Add New Template</h1>
        <FormTemplate template={new Template()} />
      </section>
    );
  }
}
