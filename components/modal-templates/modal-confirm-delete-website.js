// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ handleDelete, handleModalClose }) => {
  return {
    title: 'Are You Sure?',
    content: 'This cannot be undone.',
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
