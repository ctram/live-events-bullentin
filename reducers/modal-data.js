import actionTypes from '../actions/action-types';

const intialState = {
  modalData: {
    title: '',
    content: '',
    footer: '',
    visible: false
  }
};

function storeModalData(state = intialState, action) {
  switch (action.type) {
    case actionTypes.MODAL_SHOW:
      return Object.assign({}, state, {
        modalData: {
          visible: true,
          title: action.title,
          content: action.content,
          footer: action.footer
        }
      });
    case actionTypes.MODAL_CLOSE:
      return Object.assign({}, state, {
        modalData: { visible: false }
      });
    default:
      return state;
  }
}

export default {
  storeModalData
};
