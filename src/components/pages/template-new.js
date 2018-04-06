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
      <section className="template-new">
        <h1 className="row">Add New Template</h1>
        <FormTemplate className="row" template={new Template()} isNew={true} />
      </section>
    );
  }
}
