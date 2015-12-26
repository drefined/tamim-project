import Constants           from '../constants/formConstants';
import _                   from 'lodash';


let ragas = {
  ragaA :  {
    name : 'Raga A',
    medicalConditions : ['Asthma']
  },
  ragaB :  {
    name : 'Raga B',
    medicalConditions : ['hypertension']
  },
  ragaC :  {
    name : 'Raga C',
    medicalConditions : ['insomnia']
  },
  ragaD :  {
    name : 'Raga D',
    medicalConditions : ['high blood', 'pressure', 'pain control']
  }
}

let initialState = {
  isInitializing: false,
  initializeError: false,
  isSaving : false,
  hasSaveError : false,
  errorMessage : '',
  form : {
    user : '',
    raga : '',
    medicalCondition : '',
    song : ''
  },
  ragas : ragas
}


module.exports  = function(state = initialState, action) {
  switch (action.type) {
    case Constants.SELECT_RAGA:
      return selectRaga(state,action);
    case Constants.SELECT_CONDITION:
      return selectCondition(state,action);
    case Constants.UPDATE_USER:
      return updateUser(state,action);
    case Constants.SAVE_ERROR:
      return saveError(state,action);
    default:
      return state
  }
}




//use clone deep for now, if have time use immutable.js
const selectRaga = (state,action)=>{
  let newState = _.cloneDeep(state);
  newState.form.raga = action.raga;
  newState.form.condition = '';
  return newState;
}

const selectCondition = (state,action)=>{
  let newState = _.cloneDeep(state);
  newState.form.medicalCondition = action.medicalCondition;
  return newState;
}

const updateUser = (state,action)=>{
  let newState = _.cloneDeep(state);
  newState.form.user = action.user;
  return newState;
}

const startSave = (state,action)=>{
  let newState = _.cloneDeep(state);
  newState.isSaving = true;
  return newState;
}

const saveError = (state,action)=>{
  let newState = _.cloneDeep(state);
  newState.hasSaveError = true;
  newState.errorMessage = action.error.entity;
  return newState;
}
