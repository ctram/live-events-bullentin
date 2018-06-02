import React from 'react';

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
    const { user, currentUser } = this.props;
    const userRelationship = currentUser.id === user.id ? 'self' : 'other';
    const { modalDeleteConfirmation } = this.props;
    let title = `Are You Sure?`;
    let btnText = 'Yes, Delete User';
    let content = 'This cannot be undone.';
    
    if (userRelationship === 'self') {
      title = 'Are You Sure You Want To Delete Yourself?';
      btnText = 'Yes, Delete Myself';
      content += 'You will immediately log off.';
    }

    const footer = (
      <div className="btn-group">
        <button
          className="btn btn-danger"
          onClick={() => {
            this.deleteUser(user);
          }}
        >
          {btnText}
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
