// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ footer, content, title }) => {
  return (
    <div className="modal" id="myModal" data-backdrop="static">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
          </div>
          <div className="modal-body">{content}</div>
          <div className="modal-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
};
