// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ footer, contet, title }) => {
  return (
    <div class="modal" id="myModal" data-backdrop="static">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{title}</h5>
          </div>
          <div class="modal-body">{contet}</div>
          <div class="modal-footer">{footer}</div>
        </div>
      </div>
    </div>
  );
};
