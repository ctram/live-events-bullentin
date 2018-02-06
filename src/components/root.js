import React from 'react';
import FormUser from '../containers/form-user';
import PageWelcome from './page-welcome';
import Navbar from './navbar';
import { Route } from 'react-router-dom';
import $ from 'jQuery';
import Loader from 'react-loader';

export default class Root extends React.Component {
  constructor(props) {
    
    super(props);
  }

  componentDidMount() {
    const { startLoading, endLoading } = this.props;
    
    endLoading();
    
    $(document)
      .bind('ajaxSend', () => {
        startLoading();
      })
      .bind('ajaxComplete', () => {
        endLoading();
      });
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
          </div>
        </Loader>
      </div>
    );
  }
}
