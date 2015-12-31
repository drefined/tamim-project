const ragaFormValidation = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Required';
  }

  return errors;
};

export default ragaFormValidation;
