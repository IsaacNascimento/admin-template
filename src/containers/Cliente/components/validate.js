export const validate = (values) => {
  const errors = {};
  if (!values.nome) {
    errors.nome = 'O campo Nome não pode estar vazio';
  }
  if (!values.telCelular) {
    errors.telCelular = 'O campo Telefone não pode estar vazio';
  }
  if (!values.password) {
    errors.password = 'O campo Senha não pode estar vazio';
  }
  return errors;
};
