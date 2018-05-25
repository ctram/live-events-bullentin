import React from 'react';
import actionsModalData from '../actions/modal-data';

// eslint-disable-next-line no-unused-vars

export default class UserItem extends React.Component {
  constructor() {
    super();
    this.cancel = this.cancel.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.modalAreYouSure = this.modalAreYouSure.bind(this);
  }

  deleteUser(user) {
    this.props.modalClose();
    this.props.deleteUserRequest(user);
  }

  cancel() {
    this.props.modalClose();
  }

  modalAreYouSure(userRelationship) {
    const { modalDeleteConfirmation } = this.props;
    let pronoun = 'the User';
    const title = `Are You Sure You Want to Delete ${pronoun}?`;

    let content = 'This cannot be undone.';
    if (userRelationship === 'self') {
      pronoun = 'Yourself';
      content += ' You will be immediately logged off.';
    }

    const footer = (
      <div className="btn-group">
        <button className="btn btn-danger" onClick={this.deleteUser}>
          Yes, Delete
        </button>
        <button className="btn btn-secondary" onClick={this.cancel}>
          Cancel
        </button>
      </div>
    );
    modalDeleteConfirmation({ title, content, footer });
  }

  render() {
    const { user, deletable } = this.props;
    return (
      <li className="row justify-content-center">
        <div className="col-6">{user.get('username')}</div>
        <div className="col-1">
          <button
            onClick={this.modalAreYouSure}
            disabled={!deletable}
            className="btn btn-danger py-1"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}
