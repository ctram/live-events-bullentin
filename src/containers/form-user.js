import { connect } from 'react-redux';
import FormUser from '../components/form-user';
import actionUser from '../actions/user';

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: data => {
      dispatch(actionUser.createUserRequest(data));
    },
    loginUser: data => {
      dispatch(actionUser.loginUserRequest(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormUser);
