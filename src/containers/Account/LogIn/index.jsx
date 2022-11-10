import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import LogInForm from './components/LogInForm';
import { login, getUserProfile } from '../../../redux/actions/authActions';
import Notificationbar from '../components/Notificationbar/Notificationbar';
import { clearError, clearSuccess } from '@/redux/actions/notificacoesActions';

const LogIn = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const error = useSelector((state) => state.notificacoes.error);
  const success = useSelector((state) => state.notificacoes.success);

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

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);
  const handleSubmit = (data) => {
    const { email, password } = data;
    dispatch(login(email, password));
  };

  if (isLoggedIn) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="account">
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
            <h4 className="account__subhead subhead">
              Àrea administrativa - Acesso Restrito
            </h4>
          </div>
          <LogInForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default LogIn;

// if you want to add select, date-picker and time-picker in your app you need to uncomment the first
// four lines in /scss/component/form.scss to add styles
