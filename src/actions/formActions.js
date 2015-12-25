import Constants      from '../constants/formConstants';
import * as API       from '../api/api';

export const selectRaga = (raga)=>{
  return {
    type : Constants.SELECT_RAGA,
    raga : raga
  }
}

export const selectCondition = (medicalCondition)=>{
  return {
    type : Constants.SELECT_CONDITION,
    medicalCondition : medicalCondition
  }
}


export const saveForm = ()=>{
  return (dispatch,getState)=>{
    dispatch({
      type : Constants.START_SAVE
    });

    API.saveForm(getState().formStore.form).then(res=>{
      //redirect
      console.log('saved successfully');
    }).catch(res=>{
      dispatch({
        type : Constants.SAVE_ERROR,
        res : res
      });
    });
  }
}
