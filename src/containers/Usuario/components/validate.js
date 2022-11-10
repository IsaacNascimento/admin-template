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
  if (values.password && values.password.length !== 6) {
    errors.password = 'O campo Senha deve conter 6 caracteres';
  }
  if (!values.perfil) {
    errors.perfil = 'O campo Perfil não pode estar vazio';
  }
  return errors;
};
