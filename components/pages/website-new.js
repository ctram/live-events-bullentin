import React from 'react';
// eslint-disable-next-line no-unused-vars
import FormWebsite from '../form-website';
import Website from '../../backbone/models/website';
import { connect } from 'react-redux';

export class PageWebsiteNew extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { newWebsite } = this.props;
    return (
      <section className="website-new">
        <h1>Add New Website</h1>
        <FormWebsite className="row" website={newWebsite || new Website()} isNew={true} />
      </section>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign({}, state.storeWebsites);
};

export default connect(mapStateToProps)(PageWebsiteNew);
