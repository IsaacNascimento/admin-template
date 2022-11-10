const validate = (values) => {
  const errors = {};
  if (!values.nome) {
    errors.nome = 'O campo não pode estar vazio';
  }
  if (!values.codigo) {
    errors.codigo = 'O campo não pode estar vazio';
  }
  return errors;
};
export default validate;
