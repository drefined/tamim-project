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
  form : {
    raga : '',
    medicalCondition : '',
    song : ''
  },
  ragas : ragas
}

//use clone deep for now, if have time use immutable.js
module.exports  = function(state = initialState, action) {
  switch (action.type) {
    case Constants.SELECT_RAGA:
      return selectRaga(state,action);
    default:
      return state
  }
}

const selectRaga = (state,action)=>{
  let newState = _.cloneDeep(state);
  newState.form.raga = action.raga;
  newState.form.condition = '';
  return newState;
}
