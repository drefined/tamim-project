import rest from '../utils/rest';

export const getAllForms = ()=>{
  return rest({
    path : '/forms'
  })
}

export const getFormById = (id)=>{
  return rest({
    path : `/forms/${id}`
  })
}

export const saveForm = (form)=>{
  return rest({
    method: 'POST',
    path: '/forms',
    entity: form
  })
}

export const upudateForm = (form)=>{
  return rest({
    method: 'PUT',
    path: '/forms',
    entity: form
  })
}
