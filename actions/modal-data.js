import actionTypes from './action-types';

function modalShow({ title, content, footer }) {
  return { type: actionTypes.MODAL_SHOW, title, content, footer };
}

function modalClose() {
  return { type: actionTypes.MODAL_CLOSE };
}
export default {
  modalShow,
  modalClose
};
