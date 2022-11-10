import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import AlternateEmailIcon from 'mdi-react/AlternateEmailIcon';
import { Button } from 'reactstrap';
import FormField from '@/shared/components/form/FormField';
import validate from './validate';

const ResetPasswordForm = ({ onSubmit, fieldUser }) => (
  <Form onSubmit={onSubmit} validate={validate}>
    {({ handleSubmit }) => (
      <form className="form reset-password-form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <div>
            <span className="form__form-group-label">{fieldUser}</span>
          </div>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AlternateEmailIcon />
            </div>
            <Field
              name="email"
              id="email"
              component={FormField}
              type="email"
              placeholder="exemplo@mail.com.br"
              className="input-without-border-radius"
              isAboveError
            />
          </div>
        </div>
        <Button className="account__btn" color="primary">
          Recuperar Senha
        </Button>
      </form>
    )}
  </Form>
);

ResetPasswordForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fieldUser: PropTypes.shape(),
};

ResetPasswordForm.defaultProps = {
  fieldUser: null,
};

export default ResetPasswordForm;
