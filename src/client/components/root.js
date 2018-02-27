import React from 'react';
import FormUser from '../containers/form-user';
import PageWelcome from './page-welcome';
import Navbar from './navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import $ from 'jQuery';
import Loader from 'react-loader';
import UserProfile from './user-profile';
import actionsUser from '../actions/user';
import Users from './users';
import { connect } from 'react-redux';
import actionsLoader from '../actions/loader';
import actionsUsers from '../actions/users';
import { withRouter } from 'react-router-dom';


export class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { startLoading, endLoading, history } = this.props;
    endLoading();
    $(document)
      .bind('ajaxSend', () => {
        startLoading();
      })
      .bind('ajaxComplete', () => {
        endLoading();
      });

    window.reactRouterHistory = history;
  }

  render() {
    const { location, fetchUserRequest, loggedIn } = this.props;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <Navbar loggedIn={loggedIn} location={location} />
        </div>
        <Loader loaded={this.props.loaded}>
          <div className="row justify-content-center">
            <Route exact path="/" component={PageWelcome} />
            <Route exact path="/register" component={FormUser} />
            <Route exact path="/login" component={FormUser} />
            <Route
              exact
              path="/users"
              render={() => {
                return <Users location={location} />;
              }}
            />
            <Route
              exact
              path="/users/:id"
              render={() => {
                return <UserProfile fetchUserRequest={fetchUserRequest} location={location} />;
              }}
            />
          </div>
        </Loader>
      </div>
    );
  }
}

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
