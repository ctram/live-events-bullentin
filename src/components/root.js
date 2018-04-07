// FIXME: eslint triggering react element rendering as UNUSED
// var error

import React from 'react';
import FormUser from '../containers/form-user';
import PageWelcome from './page-welcome';
// eslint-disable-next-line no-unused-vars
import Navbar from './navbar';
// eslint-disable-next-line no-unused-vars
import { Route, Switch, Redirect } from 'react-router-dom';
import $ from 'jQuery';
// eslint-disable-next-line no-unused-vars
import Loader from 'react-loader';
// eslint-disable-next-line no-unused-vars
import UserProfile from './user-profile';
// eslint-disable-next-line no-unused-vars
import Users from './users';
import { connect } from 'react-redux';
import actionsUsers from '../actions/users';
import { withRouter } from 'react-router-dom';
import PageTemplates from './pages/templates';
// eslint-disable-next-line no-unused-vars
import ErrorBoundary from './error-boundary';
// eslint-disable-next-line no-unused-vars
import PageTemplateNew from './pages/template-new';
// eslint-disable-next-line no-unused-vars
import PageTemplateShow from './pages/template-show';
import Page404 from './pages/404';

// eslint-disable-next-line no-unused-vars
function SwitchLoggedIn(props) {
  return (
    <Switch>
      <Route exact path="/" component={PageWelcome} />
      {props.isAdmin && <Route exact path="/users" component={Users} />}
      <Route exact path="/profile" component={UserProfile} />
      <Route exact path="/templates" component={PageTemplates} />
      <Route exact path="/templates/new" component={PageTemplateNew} />
      <Route exact path="/templates/:id" component={PageTemplateShow} />
      <Route component={Page404} />
    </Switch>
  );
}

// eslint-disable-next-line no-unused-vars
function SwitchLoggedOut() {
  return (
    <Switch>
      <Route exact path="/" component={PageWelcome} />
      <Route exact path="/register" component={FormUser} />
      <Route exact path="/login" component={FormUser} />
      <Route component={Page404} />
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
    const { loggedIn, currentUser } = this.props;
    const Routes = loggedIn ? (
      <SwitchLoggedIn isAdmin={currentUser && currentUser.isAdmin()} />
    ) : (
      <SwitchLoggedOut />
    );

    return (
      <div>
        <Loader loaded={this.props.loaded} options={{ color: 'white' }} />
        <Navbar />
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
