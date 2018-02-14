import React from 'react';
import FormUser from '../containers/form-user';
import PageWelcome from './page-welcome';
import Navbar from './navbar';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import $ from 'jQuery';
import Loader from 'react-loader';
import Hank from './hank';

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
    debugger;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <Navbar />
        </div>
        <Loader loaded={this.props.loaded}>
          <div className="row justify-content-center">
            {/*
                <Route component={PageWelcome} />
                <Route exact path="/" component={PageWelcome} />
                <Route exact path="/login" component={FormUser} />
                <Route exact path="/register" component={FormUser} />
              */}
            <Route path="/login" render={() => 'login'} />
            <Route path="/register" render={() => 'register'} />
            <Route path="/" render={() => 'welcome'} />
          </div>
        </Loader>
      </div>
    );
  }
}

export default withRouter(Root);
