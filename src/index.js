require('babel-polyfill');
import React from 'react';
import { render } from 'react-dom';
import {createStore,
        combineReducers,
        compose}                from 'redux';
import {Provider}               from 'react-redux';
import {Router,
        Route,
        IndexRoute}             from 'react-router';
import {createHistory}          from 'history';
import {syncReduxAndRouter,
        routeReducer}           from 'redux-simple-router';
import DevTools                 from './components/DevTools';
import storeFactory             from './utils/storeFactory';
import co                       from 'co';


const reducers = combineReducers(Object.assign({}, {
  routing: routeReducer
}));


const store = storeFactory(reducers,{});
const history = createHistory();
syncReduxAndRouter(history, store);


import App from './App';
import Dashboard from './components/Dashboard';
import Form      from './components/Form';

render(
  <div>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path='/' component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path='/form' component={Form}/>
          </Route>
        </Router>
        <DevTools/>
      </div>
    </Provider>
  </div>
, document.getElementById('app'))



co(function*(){
  console.log("test generators");
})
