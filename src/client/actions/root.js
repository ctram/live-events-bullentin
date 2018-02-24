import actionTypes from './action-types';

function redirect(url) {
  return { type: actionTypes.REDIRECT, redirectUrl: url };
}

export default {
  redirect
};
