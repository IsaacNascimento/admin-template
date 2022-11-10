import { handleActions } from 'redux-actions';
import {
  loginRequest,
  loginSuccess,
  esqueceuSenhaRequest,
  esqueceuSenhaSuccess,
  alterarSenhaRequest,
  alterarSenhaSuccess,
  logoutRequest,
  logoutSuccess,
  userProfileRead,
} from '../actions/authActions';

const defaultState = {
  user: {},
  isResetPasswordRequested: false,
  isLoggedIn: false,
  isFetching: false,
  error: null,
};

export default handleActions(
  {
    [loginRequest](state) {
      return {
        ...state,
        isLoggedIn: false,
        isFetching: true,
        error: null,
      };
    },
    [loginSuccess](state, { payload }) {
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
        isFetching: false,
        error: null,
      };
    },
    [esqueceuSenhaRequest](state) {
      return {
        ...state,
        isResetPasswordRequested: false,
        isFetching: true,
        error: null,
      };
    },
    [esqueceuSenhaSuccess](state, { payload }) {
      return {
        ...state,
        isResetPasswordRequested: true,
        isFetching: false,
        error: null,
      };
    },
    [logoutRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [alterarSenhaRequest](state) {
      return {
        ...state,
        isResetPasswordRequested: false,
        isFetching: true,
        error: null,
      };
    },
    [alterarSenhaSuccess](state, { payload }) {
      return {
        ...state,
        isResetPasswordRequested: true,
        isFetching: false,
        error: null,
      };
    },
    [logoutSuccess](state, { payload }) {
      return {
        ...state,
        user: payload,
        isLoggedIn: false,
        isFetching: false,
        error: null,
      };
    },
    [userProfileRead](state, { payload }) {
      return {
        ...state,
        user: payload,
        isLoggedIn: payload ? true : false,
        isFetching: false,
        error: null,
      };
    },
  },
  defaultState
);
