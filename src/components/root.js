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
    const { redirectUrl } = this.props;
    
    return (
      <div className="container">
        <div className="row justify-content-center">
          <Navbar />
        </div>
        <Loader loaded={this.props.loaded}>
          <div className="row justify-content-center">
            <Switch>
              {
                redirectUrl ? <Redirect to={redirectUrl} /> : null
              }
              <Route path="/" component={PageWelcome} />
              <Route path="/login" component={FormUser} />
              <Route path="/register" component={FormUser} />
              <Route path="/hank" component={Hank} />
            </Switch>
          </div>
        </Loader>
      </div>
    );
  }
}

export default withRouter(Root);
