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




import formReducer from './reducers/formReducer';


const reducers = combineReducers({
  routing: routeReducer,
  formStore : formReducer
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
import Dashboard from './components/Dashboard';
import Form      from './components/Form';

render(
  <div>
    <Provider store={store}>
      <div>
        <Router history={history}>
          <Route path='/' component={App}>
            <IndexRoute component={Dashboard}/>
            <Route path='form' component={Form}/>
            <Route path='form/:id' component={Form}/>
          </Route>
        </Router>
        <DevTools/>
      </div>
    </Provider>
  </div>
, document.getElementById('app'));
