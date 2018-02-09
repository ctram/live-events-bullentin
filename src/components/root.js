import React from 'react';
import FormUser from '../containers/form-user';
import PageWelcome from './page-welcome';
import Navbar from './navbar';
import { Route, withRouter } from 'react-router-dom';
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
    return (
      <div className="container">
        <div className="row justify-content-center">
          <Navbar />
        </div>
        <Loader loaded={this.props.loaded}>
          <div className="row justify-content-center">
            <Route path="/" component={PageWelcome} />
            <Route path="/login" component={FormUser} />
            <Route path="/register" component={FormUser} />
            <Route path="/hank" component={Hank} />
          </div>
        </Loader>
      </div>
    );
  }
}

export default withRouter(Root);
