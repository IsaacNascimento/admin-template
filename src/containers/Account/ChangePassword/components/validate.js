/* eslint-disable */
const validate = (values) => {
  const errors = {};
  if (!values.newPassword) {
    errors.newPassword = 'O campo senha não pode ser vazio';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword =
      'O campo confirmação de nova senha não pode ser vazio';
  } else if (values.newPassword != values.confirmPassword) {
    errors.confirmPassword = 'O campo confirmação não confere!';
  }

  return errors;
};

export default validate;
