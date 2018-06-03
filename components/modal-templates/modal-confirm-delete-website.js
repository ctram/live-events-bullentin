// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ handleDelete, handleModalClose, website }) => {
  return {
    title: 'Are You Sure?',
    content: (
      <span>
        Deleting <strong>{website.get('name')}</strong>. This cannot be undone.
      </span>
    ),
    footer: (
      <div className="btn-group">
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
        <button className="btn btn-secondary" onClick={handleModalClose}>
          Cancel
        </button>
      </div>
    )
  };
};
