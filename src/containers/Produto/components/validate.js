/* eslint-disable */
// const validate = (values) => {
//   const errors = {};
//   if (!values.nome) {
//     errors.nome = 'O campo Nome não pode estar vazio';
//   }
//   return errors;
// };
const validate = (values) => {
  const errors = {};
  if (!values.nome) {
    errors.nome = 'O campo não pode estar vazio';
  }
  return errors;
};
export default validate;
