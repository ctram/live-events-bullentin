import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line no-unused-vars
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import ReactDOM from 'react-dom';

/* eslint-disable */
import Root from './components/root';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
/* eslint-enable */

import './node_modules/toastr/build/toastr.css';
import toastr from 'toastr';
import './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './node_modules/bootstrap/scss/bootstrap.scss';
import './styles/slate-theme.scss';
import './styles/application.scss';
import { setDispatchForAppFetch } from './helpers/app-fetch';

toastr.options.timeOut = 5000;
const loggerMiddleware = createLogger();
const store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));
setDispatchForAppFetch(store.dispatch);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
