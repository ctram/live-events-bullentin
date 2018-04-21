import React from 'react';
import _ from 'underscore';
// eslint-disable-next-line no-unused-vars
import FormTemplate from '../form-template';
import { Template } from '../../backbone/models/template';

export default class PageTemplateNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="template-new">
        <h1>Add New Template</h1>
        <FormTemplate className="row" template={new Template()} isNew={true} />
      </section>
    );
  }
}
