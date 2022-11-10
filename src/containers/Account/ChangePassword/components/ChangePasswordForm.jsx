import React from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import { Button } from 'reactstrap';
import validate from './validate';
import PasswordField from '@/shared/components/form/Password';

const ResetPasswordForm = ({ onSubmit, fieldUser }) => (
  <Form onSubmit={onSubmit} validate={validate}>
    {({ handleSubmit }) => (
      <form className="form reset-password-form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <div>
            <span className="form__form-group-label">{fieldUser}</span>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Nova Senha</span>
            <div className="form__form-group-field">
              <Field
                name="newPassword"
                component={PasswordField}
                placeholder="Nova senha"
                className="input-without-border-radius"
                keyIcon
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Confirmar Senha</span>
            <div className="form__form-group-field">
              <Field
                name="confirmPassword"
                component={PasswordField}
                placeholder="Confirme sua nova senha"
                className="input-without-border-radius"
                keyIcon
              />
            </div>
          </div>
        </div>
        <Button className="account__btn" color="primary">
          Alterar Senha
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
