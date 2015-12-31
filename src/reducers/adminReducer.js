import CONSTANTS from '../constants/adminConstants';
import _ from 'lodash';

const initialState = {
  isInitializing: false,
  initializationError: false,
  errorMessage: '',
  raga: {},
  ragas: [],
};

const fetchingRagas = (state, action) => {
  const newState = _.cloneDeep(state);

  newState.isInitializing = true;

  return newState;
};

const receivedRagas = (state, action) => {
  const newState = _.cloneDeep(state);

  newState.ragas = action.ragas;
  newState.isInitializing = false;
  newState.errorMessage = action.message;

  return newState;
};

const fetchError = (state, action) => {
  const newState = _.cloneDeep(state);

  newState.isInitializing = false;
  newState.initializationError = true;
  newState.errorMessage = action.message;

  return newState;
};

const fetchRaga = (state, action) => {
  const newState = _.cloneDeep(state);

  newState.raga = _.find(newState.ragas, { name: action.ragaName });

  return newState;
};

module.exports = function adminReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.FETCH_RAGAS:
      return fetchingRagas(state, action);

    case CONSTANTS.FETCH_RAGAS_ERROR:
      return fetchError(state, action);

    case CONSTANTS.RECEIVED_RAGAS:
      return receivedRagas(state, action);

    case CONSTANTS.FETCH_RAGA:
      return fetchRaga(state, action);

    default:
      return state;
  }
};
