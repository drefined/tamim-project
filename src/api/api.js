import rest from '../utils/rest';

export const getAllRagas = ()=>{
  return rest({
    path : '/ragas'
  })
}
