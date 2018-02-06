import { connect } from 'react-redux';
import Root from '../components/root';
import actionsLoader from '../actions/loader';

const mapStateToProps = state => {
  
  return state.loader;
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

export default connect(mapStateToProps, mapDispatchToProps)(Root);
