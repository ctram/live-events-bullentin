import { connect } from 'react-redux';
import Root from '../components/root';
import actionsLoader from '../actions/loader';
import { withRouter } from 'react-router-dom';


const mapStateToProps = state => {
  return Object.assign(state.loader, state.root);
};

const mapDispatchToProps = dispatch => {
  return {
    startLoading: () => {
      dispatch(actionsLoader.startLoading());
    },
    endLoading: () => {
      dispatch(actionsLoader.endLoading());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
