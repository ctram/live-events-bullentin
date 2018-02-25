import React from 'react';
import FormUser from '../containers/form-user';
import PageWelcome from './page-welcome';
import Navbar from './navbar';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import $ from 'jQuery';
import Loader from 'react-loader';
import Hank from './hank';
import UserProfile from './user-profile';

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
    const { loggedIn } = this.props;
    // function log(history, name) {
    //   const { location, match } = history;
    //   
    //   
    //   
    //   
    //   return name;
    // }
    const NavbarWrapper = withRouter(Navbar);
    
    return (
      <div className="container">
        <div className="row justify-content-center">
          <NavbarWrapper loggedIn={loggedIn} />
        </div>
        <Loader loaded={this.props.loaded}>
          <div className="row justify-content-center">
            {/*
              <Route exact path="/login" render={history => log(history, 'login')} />
              <Route exact path="/register" render={history => log(history, 'register')} />
              <Route exact path="/" render={history => log(history, 'welcome')} />
            */}
            <Route exact path="/" component={PageWelcome} />
            <Route exact path="/register" component={FormUser} />
            <Route exact path="/login" component={FormUser} />
            <Route exact path="/users/:id" users={[1, 2, 3]} component={UserProfile} />
          </div>
        </Loader>
      </div>
    );
  }
}

export default Root;
