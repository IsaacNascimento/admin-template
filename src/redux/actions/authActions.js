import { createAction } from 'redux-actions';
import authApi from '../../utils/api/authApi';
import { JWT_KEY } from '../../utils/constants';
import { displayError, displaySuccess } from './notificacoesActions';

export const loginRequest = createAction('LOGIN_REQUEST');
export const loginSuccess = createAction('LOGIN_SUCCESS');

export const esqueceuSenhaRequest = createAction('ESQUECEU_SENHA_REQUEST');
export const esqueceuSenhaSuccess = createAction('ESQUECEU_SENHA_SUCCESS');

export const alterarSenhaRequest = createAction('ALTERAR_SENHA_REQUEST');
export const alterarSenhaSuccess = createAction('ALTERAR_SENHA_SUCCESS');

export const logoutRequest = createAction('LOGOUT_REQUEST');
export const logoutSuccess = createAction('LOGOUT_SUCCESS');

export const userProfileRead = createAction('USER_PROFILE_READ');

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await authApi.login(email, password);
    localStorage.setItem(JWT_KEY, JSON.stringify(data));
    dispatch(loginSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(displayError(e));
  }
};

export const esqueceuSenha = (email) => async (dispatch) => {
  try {
    dispatch(esqueceuSenhaRequest());
    const { data } = await authApi.esqueceuSenha(email);
    dispatch(esqueceuSenhaSuccess(data));
    dispatch(
      displaySuccess(
        'As instruções para recuperação da senha foram enviadas para o seu email.'
      )
    );
  } catch (e) {
    console.log(e);
    dispatch(displayError(e));
  }
};

export const alterarSenha =
  (newPassword, reset_password_link) => async (dispatch) => {
    try {
      dispatch(alterarSenhaRequest());
      const { data } = await authApi.alterarSenha(
        newPassword,
        reset_password_link
      );
      dispatch(alterarSenhaSuccess(data));
      dispatch(displaySuccess(data.message));
    } catch (e) {
      console.log(e);
      dispatch(displayError(e));
    }
  };

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());
    localStorage.removeItem(JWT_KEY);
    dispatch(logoutSuccess());
  } catch (e) {
    console.log(e);
    dispatch(displayError(e));
  }
};

export const getUserProfile = () => async (dispatch) => {
  if (JSON.parse(localStorage.getItem(JWT_KEY))) {
    const { user } = JSON.parse(localStorage.getItem(JWT_KEY));
    if (user) {
      dispatch(userProfileRead(user));
    }
  }
};
