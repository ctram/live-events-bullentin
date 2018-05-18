// FIXME: eslint triggering react element rendering as UNUSED
// var error

import React from 'react';
import FormUser from '../containers/form-user';
import PageWelcome from './page-welcome';
// eslint-disable-next-line no-unused-vars
import Navbar from './navbar';
// eslint-disable-next-line no-unused-vars
import { Route, Switch, Redirect } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import Loader from 'react-loader';
// eslint-disable-next-line no-unused-vars
import UserProfile from './user-profile';
// eslint-disable-next-line no-unused-vars
import Users from './users';
import { connect } from 'react-redux';
import actionsUsers from '../actions/users';
import { withRouter } from 'react-router-dom';
import PageWebsites from './pages/websites';
// eslint-disable-next-line no-unused-vars
import ErrorBoundary from './error-boundary';
// eslint-disable-next-line no-unused-vars
import PageWebsiteNew from './pages/website-new';
// eslint-disable-next-line no-unused-vars
import PageWebsiteShow from './pages/website-show';
import Page404 from './pages/404';

// eslint-disable-next-line no-unused-vars
function SwitchLoggedIn({ isAdmin, loaded }) {
  return (
    <Switch>
      {isAdmin && <Route exact path="/users" component={Users} />}
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/websites/new" component={PageWebsiteNew} />
      <Route exact path="/websites/:id" component={PageWebsiteShow} />
      <Route path="/websites" component={PageWebsites} />
      <Route component={loaded && Page404} />
    </Switch>
  );
}

// eslint-disable-next-line no-unused-vars
function SwitchLoggedOut({ loaded }) {
  return (
    <Switch>
      <Route exact path="/register" component={FormUser} />
      <Route path="/login" component={FormUser} />
      <Route component={loaded && Page404} />
    </Switch>
  );
}

export class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { history } = this.props;
    window.LEB.reactRouterHistory = history;
  }

  componentDidMount() {
    // When app is refreshed, we need to check whether user is already authenticated
    this.props.checkAuthenticationRequest();
  }

  render() {
    const { loggedIn, currentUser, loaded } = this.props;
    const pathname = window.LEB.reactRouterHistory.location.pathname;

    const Routes = loggedIn ? (
      <SwitchLoggedIn isAdmin={currentUser && currentUser.isAdmin()} loaded={loaded} />
    ) : (
      <SwitchLoggedOut loaded={loaded} />
    );

    return (
      <div>
        <Loader loaded={this.props.loaded} options={{ color: 'white' }} />
        <Navbar pathname={pathname} />
        <main>
          <ErrorBoundary>
            <div className="row justify-content-center">
              <div className="col-10">{Routes}</div>
            </div>
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign({}, state.loader, state.root, state.storeUsers);
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticationRequest: () => {
      dispatch(actionsUsers.checkAuthenticationRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
