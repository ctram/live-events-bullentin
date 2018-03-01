import React from 'react';
import FormUser from '../containers/form-user';
import PageWelcome from './page-welcome';
import Navbar from './navbar';
import { Route, Switch, Redirect } from 'react-router-dom';
import $ from 'jQuery';
import Loader from 'react-loader';
import UserProfile from './user-profile';
import Users from './users';
import { connect } from 'react-redux';
import actionsLoader from '../actions/loader';
import actionsUsers from '../actions/users';
import { withRouter } from 'react-router-dom';
import PageTemplates from './pages/templates';
import ErrorBoundary from './error-boundary';
import PageTemplateNew from './pages/template-new';
import PageTemplateEdit from './pages/template-edit';

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
    const { location, loggedIn } = this.props;

    return (
      <div className="container">
        <div className="row justify-content-center">
          <Navbar loggedIn={loggedIn} location={location} />
        </div>
        <Loader loaded={this.props.loaded}>
          <ErrorBoundary>
            <div className="row justify-content-center">
              <Switch>
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
                  path="/profile"
                  render={() => {
                    return <UserProfile location={location} />;
                  }}
                />
                <Route exact path="/templates" component={PageTemplates} />
                <Route
                  exact
                  path="/templates/new"
                  render={() => {
                    return <PageTemplateNew location={location} />;
                  }}
                />
                <Route
                  exact
                  path="/templates/:id"
                  render={() => {
                    return <PageTemplateEdit location={location} />;
                  }}
                />
              </Switch>
            </div>
          </ErrorBoundary>
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return Object.assign(state.loader, state.root, state.storeUsers);
};

const mapDispatchToProps = dispatch => {
  return {
    startLoading: () => {
      dispatch(actionsLoader.startLoading());
    },
    endLoading: () => {
      dispatch(actionsLoader.endLoading());
    },
    fetchUsersRequest: () => {
      dispatch(actionsUsers.fetchUsersRequest());
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
