import React from 'react';
import toastr from 'toastr';
import { connect } from 'react-redux';
import actionsWebsites from '../actions/websites';
import actionsModal from '../actions/modal-data';
import getModalData from './modal-templates/modal-confirm-delete-website';

class FormWebsite extends React.Component {
  constructor(props) {
    super(props);
    const { website, isNew } = props;
    this.originalWebsite = website.clone();

    this.state = {
      name: website.get('name') || '',
      selector: website.get('selector') || '',
      url: website.get('url') || '',
      editMode: isNew || false
    };
    this.demoData = {
      name: 'Hacker News',
      selector: '.athing',
      url: 'https://news.ycombinator.com/'
    };
    this.addWebsite = this.addWebsite.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.pasteDemoData = this.pasteDemoData.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.resetFormData = this.resetFormData.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { website, isNew } = nextProps;
    this.originalWebsite = website.clone();
    
    this.setState({
      selector: website.get('selector'),
      name: website.get('name'),
      url: website.get('url'),
      editMode: isNew || false
    });
  }

  addWebsite(e) {
    e.preventDefault();
    const { website } = this.props;
    const { name, url, selector } = this.state;
    website.set({ name, url, selector });

    if (website.isValid()) {
      return this.props.createWebsiteRequest(website);
    }
    return toastr.error(website.validationError);
  }

  save(e) {
    e.preventDefault();
    const { website } = this.props;
    const { name, url, selector } = this.state;
    website.set({ name, url, selector });

    if (website.isValid()) {
      return this.props.saveWebsiteRequest(website);
    }
    this.resetFormData();
    return toastr.error(website.validationError);
  }

  resetFormData() {
    const { website } = this.props;

    website.set({
      url: this.originalWebsite.get('url'),
      selector: this.originalWebsite.get('selector'),
      name: this.originalWebsite.get('name')
    });

    this.setState({
      url: website.get('url'),
      name: website.get('name'),
      selector: website.get('selector')
    });
  }

  delete(e) {
    e.preventDefault();
    const { deleteWebsiteRequest, modalClose, website } = this.props;
    modalClose();
    deleteWebsiteRequest(website);
  }

  edit(e) {
    e.preventDefault();
    this.setState({ editMode: true });
  }

  cancel(e) {
    e && e.preventDefault();
    this.resetFormData();
    this.setState({
      editMode: false
    });
  }

  handleChange(e) {
    e.preventDefault();
    const { value, name } = e.target;
    const state = {};
    state[name] = value;
    this.setState(state);
  }

  pasteDemoData(e) {
    e.preventDefault();
    const { name, selector, url } = this.demoData;

    this.setState({ name, selector, url });
  }

  confirmDelete(e) {
    e.preventDefault();
    this.props.modalShow(
      getModalData({ handleDelete: this.delete, handleModalClose: this.modalClose, website: this.props.website })
    );
  }

  modalClose(e) {
    e.preventDefault();
    this.props.modalClose();
  }

  render() {
    const { name, selector, url } = this.state;
    const { isNew } = this.props;
    const { editMode } = this.state;

    return (
      <div className="row justify-content-center">
        <div className="col-10 col-sm-8 col-md-6 col-lg-5">
          <form>
            <fieldset className="form-group">
              <label htmlFor="name">Name</label>
              <input
                name="name"
                className="form-control"
                id="name"
                value={name}
                onChange={this.handleChange}
                ref="inputname"
                disabled={!editMode}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="url">URL</label>
              <input
                name="url"
                className="form-control"
                id="url"
                value={url}
                onChange={this.handleChange}
                ref="inputurl"
                disabled={!editMode}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="selector">CSS Selector</label>
              <input
                name="selector"
                className="form-control"
                id="selector"
                value={selector}
                onChange={this.handleChange}
                ref="inputselector"
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
                <button className="btn btn-danger" onClick={this.confirmDelete} disabled={editMode}>
                  Delete
                </button>
              )}
              {
                <button
                  className="btn btn-warning"
                  onClick={this.pasteDemoData}
                  disabled={!editMode}
                >
                  Use Demo Data
                </button>
              }
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { website } = ownProps;

  return Object.assign(state.loader, state.root, state.storeUsers, {
    name: website.get('name'),
    url: website.get('url'),
    selector: website.get('selector')
  });
};

const mapDispatchToProps = dispatch => {
  return {
    createWebsiteRequest: website => {
      dispatch(actionsWebsites.createWebsiteRequest(website));
    },
    deleteWebsiteRequest: id => {
      dispatch(actionsWebsites.deleteWebsiteRequest(id));
    },
    saveWebsiteRequest: website => {
      dispatch(actionsWebsites.saveWebsiteRequest(website));
    },
    modalShow: data => {
      dispatch(actionsModal.modalShow(data));
    },
    modalClose: () => {
      dispatch(actionsModal.modalClose());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWebsite);
