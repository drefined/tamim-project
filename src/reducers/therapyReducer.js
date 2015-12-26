import Constants           from '../constants/therapyConstants';
import _                   from 'lodash';


let initialState = {
  isInitializing: false,
  initializationError: false,
  errorMessage : '',
  raga : '',
  medicalCondition : '',
  ragas : []
}


module.exports  = function(state = initialState, action) {
  switch (action.type) {
    case Constants.FETCHING_RAGAS:
      return fetchingRagas(state,action);
    case Constants.SELECT_RAGA:
      return selectRaga(state,action);
    case Constants.RECEIVED_RAGAS:
      return receivedRagas(state,action);
    case Constants.FETCH_RAGAS_ERROR:
      return fetchError(state,action);
    case Constants.SELECT_CONDITION:
      return selectCondition(state,action);
    default:
      return state
  }
}


const fetchingRagas = (state,action)=>{
  let newState = _.cloneDeep(state)
  newState.isInitializing = true;
  return newState;
}

const receivedRagas = (state,action)=>{
  let newState = _.cloneDeep(state)
  newState.ragas = action.ragas;
  newState.isInitializing = false;
  newState.errorMessage = action.message;
  return newState;
}

const fetchError = (state,action)=>{
  let newState = _.cloneDeep(state)
  newState.isInitializing = false;
  newState.initializationError = true;
  newState.errorMessage = action.message;

  return newState;
}



//use clone deep for now, if have time use immutable.js
const selectRaga = (state,action)=>{
  let newState = _.cloneDeep(state);
  newState.raga = action.raga;
  newState.medicalCondition = '';
  return newState;
}

const selectCondition = (state,action)=>{
  let newState = _.cloneDeep(state);
  newState.medicalCondition = action.medicalCondition;
  return newState;
}
