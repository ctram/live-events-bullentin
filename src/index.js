import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
// eslint-disable-next-line no-unused-vars
import { Provider } from 'react-redux';
import reducers from './reducers/index';
// eslint-disable-next-line no-unused-vars
import Root from './components/root';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import React from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import _toastr from '../node_modules/toastr/build/toastr.css';
// eslint-disable-next-line no-unused-vars
import toastr from 'toastr';
import './styles/slate-theme.scss';
import './styles/application.scss';
import { setDispatchForAppFetch } from './helpers/app-fetch';

window.ClientStore = {};

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
