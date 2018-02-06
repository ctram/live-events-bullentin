import actionTypes from './action-types';

export default {
  startLoading: () => {
    return { type: actionTypes.START_LOADING };
  },
  endLoading: () => {
    return { type: actionTypes.END_LOADING };
  }
};
