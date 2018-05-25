// eslint-disable-next-line no-unused-vars
import React from 'react';

export default ({ domButtons, domContent, domTitle }) => {
  return (
    <div class="modal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{domTitle}</h5>
          </div>
          <div class="modal-body">{domContent}</div>
          <div class="modal-footer">{domButtons}</div>
        </div>
      </div>
    </div>
  );
};
