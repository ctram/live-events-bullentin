import { connect } from 'react-redux';
import Root from '../components/root';
import actionsLoader from '../actions/loader';
import actionsUser from '../actions/user';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  return Object.assign(state.loader, state.root, state.user);
};

const mapDispatchToProps = dispatch => {
  return {
    startLoading: () => {
      dispatch(actionsLoader.startLoading());
    },
    endLoading: () => {
      dispatch(actionsLoader.endLoading());
    },
    fetchUserRequest: () => {
      dispatch(actionsUser.fetchUserRequest());
    },
    fetchUsersRequest: () => {
      dispatch(actionsUser.fetchUsersRequest());
    },
    fetchUsersSuccess: users => {
      dispatch(actionsUser.fetchUsersSuccess(users));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
