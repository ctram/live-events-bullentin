import React from 'react';
// eslint-disable-next-line no-unused-vars
import FormWebsite from '../form-website';
import Website from '../../backbone/models/website';

export default class PageWebsiteNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="website-new">
        <h1>Add New Website</h1>
        <FormWebsite className="row" website={new Website()} isNew={true} />
      </section>
    );
  }
}
