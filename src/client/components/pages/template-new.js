import React from 'react';
import _ from 'underscore';
import FormTemplate from '../form-template';
import Template from '../../models/template';

export class PageTemplateNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        <h1>Add New Template</h1>
        <FormTemplate template={new Template()} />
      </section>
    );
  }
}

export default PageTemplateNew;
