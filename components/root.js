import React from 'react';
import { connect } from 'react-redux';
import actionsUsers from '../actions/users';
import { withRouter } from 'react-router-dom';
import PageWebsites from './pages/websites';
import PageWebsiteNew from './pages/website-new';
import PageWebsiteShow from './pages/website-show';
import PageAbout from './pages/about';
import PageLogin from './pages/login';
import PageRegister from './pages/register';
import PageUsers from './pages/users';
import PageUserProfile from './pages/user-profile';
import Page404 from './pages/404';
import jquery from 'jquery';

// FIXME: eslint triggering react element rendering as UNUSED
/* eslint-disable */
import Navbar from './navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loader from 'react-loader';
import ErrorBoundary from './error-boundary';
import Modal from './modal';
/* eslint-enable */
import appConfig from '../app-config';

const TOOLTIP_SELECTOR = '[data-toggle="tooltip"]';

// eslint-disable-next-line no-unused-vars
function SwitchLoggedIn({ isAdmin, loaded }) {
  return (
    <Switch>
      {isAdmin && <Route exact path="/users" component={PageUsers} />}
      <Route exact path="/about" component={PageAbout} />
      <Route exact path="/profile" component={PageUserProfile} />
      <Route exact path="/websites/new" component={PageWebsiteNew} />
      <Route exact path="/websites/:id" component={PageWebsiteShow} />
      <Route path="/websites" component={PageWebsites} />
      {loaded && <Route component={Page404} />}
    </Switch>
  );
}

// eslint-disable-next-line no-unused-vars
function SwitchLoggedOut({ loaded }) {
  return (
    <Switch>
      <Route exact path="/about" component={PageAbout} />
      <Route exact path="/register" component={PageRegister} />
      <Route path="/login" component={PageLogin} />
      {loaded && <Route component={Page404} />}
    </Switch>
  );
}

class Root extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // If user refreshes page, check whether user is already authenticated
    this.props.checkAuthenticationRequest();
    this.initializeTooltip();
  }

  componentWillReceiveProps(nextProps) {
    this.initializeTooltip();
    if (this.props.modalData.visible !== nextProps.modalData.visible) {
      nextProps.modalData.visible
        ? jquery('#myModal').modal('show')
        : jquery('#myModal').modal('hide');
    }
  }

  componentWillMount() {
    const { history } = this.props;
    Object.assign(appConfig, {
      reactRouterHistory: history,
      serverUrl: window.LEB.appConfig.serverUrl
    });
  }

  componentWillUnmount() {
    jquery(() => {
      jquery(TOOLTIP_SELECTOR).tooltip('dispose');
    });
    jquery('#myModal').modal('dispose');
  }

  initializeTooltip() {
    jquery(() => jquery(TOOLTIP_SELECTOR).tooltip());
  }

  render() {
    const { loggedIn, currentUser, loaded, modalData } = this.props;
    const pathname = appConfig.reactRouterHistory.location.pathname;

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
            <div className="">{Routes}</div>
            <Modal title={modalData.title} content={modalData.content} footer={modalData.footer} />
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign({}, state.loader, state.root, state.storeUsers, state.storeModalData);
};

const mapDispatchToProps = dispatch => {
  return {
    checkAuthenticationRequest: () => {
      dispatch(actionsUsers.checkAuthenticationRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
