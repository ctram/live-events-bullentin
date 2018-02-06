import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import ContainerRoot from './containers/root';
import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

const loggerMiddleware = createLogger();
const store = createStore(reducers, applyMiddleware(thunkMiddleware, loggerMiddleware));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <ContainerRoot />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root-container'));
