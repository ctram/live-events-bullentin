import actionTypes from './action-types';

function redirect(path) {
  return { type: actionTypes.REDIRECT, path };
}

export default {
  redirect
};
