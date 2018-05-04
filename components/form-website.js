import React from 'react';
import _ from 'underscore';
import toastr from 'toastr';
import { connect } from 'react-redux';
import actionsWebsites from '../actions/websites';

export class FormWebsite extends React.Component {
  constructor(props) {
    super(props);
    const { website, isNew } = props;

    this.state = {
      websiteName: website.get('name') || '',
      websiteSelector: website.get('selector') || '',
      websiteUrl: website.get('url') || '',
      editMode: isNew || false
    };
    this.addWebsite = this.addWebsite.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { websiteSelector, websiteName, websiteUrl, isNew } = nextProps;
    this.setState({ websiteSelector, websiteName, websiteUrl, editMode: isNew || false });
  }

  addWebsite(e) {
    e.preventDefault();
    const { websiteName, websiteSelector, websiteUrl } = this.state;

    if (!this.validateForm()) {
      return;
    }

    this.props.createWebsiteRequest({
      name: websiteName,
      url: websiteUrl,
      selector: websiteSelector
    });
  }

  save(e) {
    e.preventDefault();
    const { websiteName, websiteSelector, websiteUrl } = this.state;
    const { website } = this.props;

    if (!this.validateForm()) {
      return;
    }

    this.props.saveWebsiteRequest({
      name: websiteName,
      url: websiteUrl,
      selector: websiteSelector,
      id: website.id
    });
  }

  validateForm() {
    const { websiteName, websiteSelector, websiteUrl } = this.state;

    if (_.isEmpty(websiteName) || _.isEmpty(websiteUrl) || _.isEmpty(websiteSelector)) {
      toastr.error('Name, URL and Selector required');
      return false;
    }
    return true;
  }

  delete(e) {
    e.preventDefault();
    const { deleteWebsiteRequest, website } = this.props;
    deleteWebsiteRequest(website.id);
  }

  edit(e) {
    e.preventDefault();
    this.setState({ editMode: true });
  }

  cancel(e) {
    e.preventDefault();
    this.setState({ editMode: false });
  }

  handleChange(e) {
    e.preventDefault();
    const { value, name } = e.target;
    const element = `website${name.charAt(0).toUpperCase() + name.slice(1)}`;
    const state = {};
    state[element] = value;
    this.setState(state);
  }

  render() {
    const { websiteName, websiteSelector, websiteUrl } = this.state;
    const { isNew } = this.props;
    const { editMode } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-4">
          <form>
            <fieldset className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                className="form-control"
                id="name"
                value={websiteName}
                onChange={this.handleChange}
                ref="inputWebsiteName"
                disabled={!editMode}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="url">URL</label>
              <input
                name="url"
                className="form-control"
                id="url"
                value={websiteUrl}
                onChange={this.handleChange}
                ref="inputWebsiteUrl"
                disabled={!editMode}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="selector">Selector</label>
              <input
                name="selector"
                className="form-control"
                id="selector"
                value={websiteSelector}
                onChange={this.handleChange}
                ref="inputWebsiteSelector"
                disabled={!editMode}
              />
            </fieldset>
            <div className="btn-group">
              {isNew && (
                <button className="btn btn-primary" onClick={this.addWebsite}>
                  Add Website
                </button>
              )}
              {!isNew &&
                editMode && (
                  <button className="btn btn-primary" onClick={this.save}>
                    Save
                  </button>
                )}
              {!isNew &&
                !editMode && (
                  <button className="btn btn-secondary" onClick={this.edit}>
                    Edit
                  </button>
                )}
              {!isNew &&
                editMode && (
                  <button className="btn btn-secondary" onClick={this.cancel}>
                    Cancel
                  </button>
                )}
              {!isNew && (
                <button className="btn btn-danger" onClick={this.delete} disabled={editMode}>
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { website } = ownProps;

  const websiteName = website.get('name');
  const websiteUrl = website.get('url');
  const websiteSelector = website.get('selector');
  return Object.assign(state.loader, state.root, state.storeUsers, {
    websiteName,
    websiteUrl,
    websiteSelector
  });
};

const mapDispatchToProps = dispatch => {
  return {
    createWebsiteRequest: data => {
      dispatch(actionsWebsites.createWebsiteRequest(data));
    },
    deleteWebsiteRequest: id => {
      dispatch(actionsWebsites.deleteWebsiteRequest(id));
    },
    saveWebsiteRequest: data => {
      dispatch(actionsWebsites.saveWebsiteRequest(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWebsite);
