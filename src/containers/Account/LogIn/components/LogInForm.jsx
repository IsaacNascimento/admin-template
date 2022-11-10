import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Field, Form } from 'react-final-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import FormField from '@/shared/components/form/FormField';
import renderCheckBoxField from '@/shared/components/form/CheckBox';
import PasswordField from '@/shared/components/form/Password';
import validate from './validate';

const LogInForm = ({ onSubmit }) => (
  <Form onSubmit={onSubmit} validate={validate}>
    {({ handleSubmit }) => (
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Nome de usuário</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Field
              name="email"
              component={FormField}
              type="text"
              placeholder="Nome de usuário ou email"
              isAboveError
            />
          </div>
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Senha</span>
          <div className="form__form-group-field">
            <Field
              name="password"
              component={PasswordField}
              placeholder="Senha"
              className="input-without-border-radius"
              keyIcon
              isAboveError
            />
            <div className="account__forgot-password">
              <NavLink to="/recuperar-senha">Esqueceu a senha?</NavLink>
            </div>
          </div>
        </div>
        <div className="form__form-group">
          <div className="form__form-group-field">
            <Field
              name="remember_me"
              component={renderCheckBoxField}
              label="Lembrar de mim"
              type="checkbox"
            />
          </div>
        </div>
        <Button
          className="btn btn-primary account__btn account__btn--small"
          color="primary"
          type="submit"
        >
          Entrar
        </Button>
      </form>
    )}
  </Form>
);

LogInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LogInForm;
