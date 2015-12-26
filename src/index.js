require('babel-polyfill');
import React from 'react';
import { render } from 'react-dom';
import {createStore,
        combineReducers,
        applyMiddleware,
        compose}                from 'redux';
import {Provider}               from 'react-redux';
import thunk                    from 'redux-thunk';
import {Router,
        Route,
        IndexRoute}             from 'react-router';
import createHistory            from 'history/lib/createHashHistory';
import {syncReduxAndRouter,
        routeReducer}           from 'redux-simple-router';
import DevTools                 from './components/DevTools';
import co                       from 'co';
import data                     from '../db/data';




import therapyReducer from './reducers/therapyReducer';


const reducers = combineReducers({
  routing: routeReducer,
  therapyStore : therapyReducer
});


let middleWare = [thunk];
let createStoreWithMiddleware = compose(
            applyMiddleware(...middleWare),
            DevTools.instrument()
          )(createStore);

let store = createStoreWithMiddleware(reducers);


const history = createHistory();
syncReduxAndRouter(history, store);


import App       from './App';
import Therapy   from './components/Therapy';
//import Dashboard from './components/Dashboard';
// import Form      from './components/Form';

render(
  <div>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path='/' component={App}>
            <IndexRoute component={Therapy}/>
            <Route path='/admin' component={null}/>
          </Route>
        </Router>
        <DevTools/>
      </div>
    </Provider>
  </div>
, document.getElementById('app'));
