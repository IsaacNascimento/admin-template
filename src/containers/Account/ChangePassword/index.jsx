import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ChangePasswordForm from './components/ChangePasswordForm';
import { alterarSenha } from '@/redux/actions/authActions';
import Notificationbar from '../components/Notificationbar/Notificationbar';
import { clearError, clearSuccess } from '@/redux/actions/notificacoesActions';

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.notificacoes.error);
  const success = useSelector((state) => state.notificacoes.success);
  const isResetPasswordRequested = useSelector(
    (state) => state.auth.isResetPasswordRequested
  );
  const { reset_password_link } = props.match.params;

  console.log(reset_password_link);

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
    const { newPassword } = data;
    dispatch(alterarSenha(newPassword, reset_password_link));
  };

  console.log(error);
  console.log(isResetPasswordRequested);
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
            <h4 className="account__subhead subhead">Alterar senha</h4>
          </div>
          <ChangePasswordForm {...props} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
