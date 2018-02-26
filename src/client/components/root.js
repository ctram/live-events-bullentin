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

class Root extends React.Component {
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
    const { location, fetchUserRequest, fetchUsersRequest, loggedIn, users } = this.props;

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
                return (
                  <Users
                    fetchUsersRequest={fetchUsersRequest}
                    location={location}
                    users={users}
                  />
                );
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

export default Root;
