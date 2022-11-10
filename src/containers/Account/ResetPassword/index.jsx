import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import ResetPasswordForm from './components/ResetPasswordForm';
import { esqueceuSenha } from '@/redux/actions/authActions';
import Notificationbar from '../components/Notificationbar/Notificationbar';
import { clearError, clearSuccess } from '@/redux/actions/notificacoesActions';

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.notificacoes.error);
  const success = useSelector((state) => state.notificacoes.success);
  const isResetPasswordRequested = useSelector(
    (state) => state.auth.isResetPasswordRequested
  );

  useEffect(() => {
    if (error) {
      Notificationbar(error, null);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success) {
      Notificationbar(null, success);
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  const handleSubmit = (data) => {
    const { email } = data;
    dispatch(esqueceuSenha(email));
  };

  if (isResetPasswordRequested && !error && success) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="account account--not-photo">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              Bem vindo à
              <span className="account__logo">
                {' '}
                <span className="account__logo-accent">Crefadi</span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">Recuperar senha</h4>
          </div>
          <ResetPasswordForm {...props} onSubmit={handleSubmit} />
          <div className="account__have-account">
            <p>
              Lembrou da senha? <NavLink to="/login">Login</NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
