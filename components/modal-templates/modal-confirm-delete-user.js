// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ user, currentUser, handleDelete, handleModalClose }) => {
  const userRelationship = currentUser.id === user.id ? 'self' : 'other';
  let title = `Are You Sure?`;
  let btnText = 'Delete User';
  let content = (
    <span>
      Deleting user <strong>{user.get('username')}</strong>. This cannot be undone.
    </span>
  );

  if (userRelationship === 'self') {
    title = 'Are You Sure You Want To Delete Yourself?';
    btnText = 'Delete Myself';
    content += ' You will immediately log off.';
  }

  return {
    title,
    content,
    footer: (
      <div className="btn-group">
        <button
          className="btn btn-danger"
          onClick={() => {
            handleDelete(user);
          }}
        >
          {btnText}
        </button>
        <button className="btn btn-secondary" onClick={handleModalClose}>
          Cancel
        </button>
      </div>
    )
  };
};
