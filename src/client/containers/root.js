import { connect } from 'react-redux';
import Root from '../components/root';
import actionsLoader from '../actions/loader';
import actionsUser from '../actions/user';
import actionsUsers from '../actions/users';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
  
  return Object.assign(state.loader, state.root, state.user, state.users);
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
      dispatch(actionsUsers.fetchUsersRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
