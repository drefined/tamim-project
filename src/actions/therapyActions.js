import Constants      from '../constants/therapyConstants';
import * as API       from '../api/api';
import _              from 'lodash';


export const fetchRagas = ()=>{
  return (dispatch,state)=>{
    dispatch({
      type : Constants.FETCHING_RAGAS
    });

    API.getAllRagas().then(res=>{
      dispatch({
        type : Constants.RECEIVED_RAGAS,
        ragas : _.sortBy(res.entity, 'name')
      });
    }).catch(res=>{
      dispatch({
        type : Constants.FETCH_RAGAS_ERROR,
        message : res.entity
      });
    })
  }
}

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

export const updateUser = (user)=>{
  return {
    type : Constants.UPDATE_USER,
    user : user
  }
}
