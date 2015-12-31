import CONSTANTS from '../constants/adminConstants';
import * as API from '../api/api';
import _ from 'lodash';

export const fetchRagas = () => {
  return (dispatch, state) => {
    dispatch({ type: CONSTANTS.FETCHING_RAGAS });

    API.getRagas().then((res) => {
      dispatch({
        type: CONSTANTS.RECEIVED_RAGAS,
        ragas: _.sortBy(res.entity, 'name'),
      });
    }).catch((res) => {
      dispatch({
        type: CONSTANTS.FETCH_RAGAS_ERROR,
        message: res.entity,
      });
    });
  };
};

export const fetchRaga = (ragaName) => {
  return {
    type: CONSTANTS.FETCH_RAGA,
    ragaName: ragaName,
  };
};
