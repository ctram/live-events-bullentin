import React from 'react';
/* eslint-disable */
import { Link } from 'react-router-dom';
/* eslint-enable */
import getModalData from './modal-templates/modal-confirm-delete-website';

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
    this.props.modalShow(
      getModalData({ handleDelete: this.delete, handleModalClose: this.modalClose })
    );
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
    const { websites, modalShow, modalClose, handleDelete } = this.props;

    return (
      <section>
        <h1>Websites</h1>
        <ul>
          {websites.map((website, idx) => {
            return (
              <li key={idx}>
                <WebsiteItem
                  website={website}
                  modalShow={modalShow}
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
