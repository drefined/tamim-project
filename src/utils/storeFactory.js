import DevTools                 from '../components/DevTools';
import {createStore,
        combineReducers,
        compose}                from 'redux';

const finalCreateStore = compose(
  DevTools.instrument()
)(createStore);

export default function configureStore(reducers,initialState) {
  const store = finalCreateStore(reducers, initialState);
  return store;
}
