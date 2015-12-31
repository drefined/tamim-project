require('babel-polyfill');

import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory  from 'history/lib/createHashHistory';
import { syncReduxAndRouter, routeReducer } from 'redux-simple-router';
import DevTools from './components/DevTools';
import adminReducer from './reducers/adminReducer';
import therapyReducer from './reducers/therapyReducer';

const reducers = {
  routing: routeReducer,
  adminStore: adminReducer,
  therapyStore: therapyReducer,
  form: formReducer,
};

const reducer = combineReducers(reducers);
const middleWare = [thunk];
const createStoreWithMiddleware = compose(
  applyMiddleware(...middleWare),
  DevTools.instrument()
)(createStore);

const store = createStoreWithMiddleware(reducer);

const history = createHistory();
syncReduxAndRouter(history, store);

import App from './App';
import Admin from './components/Admin';
import Therapy from './components/Therapy';

render(
  <div>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path="/" component={App}>
            <IndexRoute component={Therapy}/>
            <Route path="/admin" component={Admin}/>
          </Route>
        </Router>
        <DevTools/>
      </div>
    </Provider>
  </div>
  , document.getElementById('app')
);
