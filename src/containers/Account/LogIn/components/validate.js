/* eslint-disable */
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'O campo email não pode ser vazio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email inválido';
  }
  if (!values.password) {
    errors.password = 'O campo senha não pode ser vazio';
  }

  return errors;
};

export default validate;
