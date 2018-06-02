import React from 'react';
import getModalData from './modal-templates/modal-confirm-delete-user';

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

  modalAreYouSure() {
    const { user, currentUser, modalShow } = this.props;
    modalShow(
      getModalData({
        user,
        currentUser,
        handleDelete: this.deleteUser,
        handleModalClose: this.cancel
      })
    );
  }

  render() {
    const { user, deletable } = this.props;
    return (
      <li className="row justify-content-center mb-1">
        <div className="col-6">{user.get('username')}</div>
        <div className="col-1">
          <button
            onClick={this.modalAreYouSure}
            disabled={!deletable}
            className="btn btn-danger py-0 px-1"
          >
            Delete
          </button>
        </div>
      </li>
    );
  }
}
