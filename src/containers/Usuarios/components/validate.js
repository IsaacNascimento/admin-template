const validate = (values) => {
  const errors = {};
  if (values.createdAt?.start && values.createdAt?.end) {
    values.createdAt.start.setHours(0, 0, 0, 0);
    values.createdAt.end.setHours(23, 59, 59, 99);
    if (values.createdAt.start > values.createdAt.end) {
      errors.createdAt = 'Data final não pode ser maior que a inicial.';
    }
  }
  return errors;
};

export default validate;
