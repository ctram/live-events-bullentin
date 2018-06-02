import React from 'react';
/* eslint-disable */
import { Link } from 'react-router-dom';
/* eslint-enable */

// eslint-disable-next-line no-unused-vars
class WebsiteItem extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
  }

  delete(e) {
    const { modalClose, handleDelete, website } = this.props;

    e.preventDefault();
    modalClose();
    handleDelete(website);
  }

  modalClose(e) {
    e.preventDefault();
    this.props.modalClose();
  }

  confirmDelete(e) {
    e.preventDefault();
    this.props.confirmDelete({
      title: 'Are You Sure?',
      content: 'This cannot be undone.',
      footer: (
        <div className="btn-group">
          <button className="btn btn-danger" onClick={this.delete}>
            Delete
          </button>
          <button className="btn btn-secondary" onClick={this.modalClose}>
            Cancel
          </button>
        </div>
      )
    });
  }

  render() {
    const { website } = this.props;

    return (
      <div className="row">
        <Link to={`/websites/${website.id}`} className="col-6">
          {website.get('name')}
        </Link>
        <div className="col-1 offset-3">
          <span onClick={this.confirmDelete}>
            <i className="fas fa-trash" />
          </span>
        </div>
      </div>
    );
  }
}

export default class WebsitesList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { websites, confirmDelete, modalClose, handleDelete } = this.props;

    return (
      <section>
        <h1>Websites</h1>
        <ul>
          {websites.map((website, idx) => {
            return (
              <li key={idx}>
                <WebsiteItem
                  website={website}
                  confirmDelete={confirmDelete}
                  handleDelete={handleDelete}
                  modalClose={modalClose}
                />
              </li>
            );
          })}
        </ul>
      </section>
    );
  }
}
