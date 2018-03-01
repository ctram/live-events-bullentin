import React from 'react';
import _ from 'underscore';
import FormTemplate from '../form-template';

export class PageTemplateNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { template } = this.props;
    return (
      <section>
        <h1>Add New Template</h1>
        <FormTemplate template={template} />
      </section>
    );
  }
}

export default PageTemplateNew;
