import rest from '../utils/rest';

export const getRagas = () => {
  return rest({ path: '/ragas' });
};

export const postRaga = (raga) => {
  return rest({ path: '/ragas', method: 'POST', entity: raga });
};

export const updateRaga = (id, raga) => {
  return rest({ path: `/ragas/${id}`, method: 'PUT', entity: raga });
};

export const deleteRaga = (id) => {
  return rest({ path: `/ragas/${id}`, method: 'DELETE' });
};
