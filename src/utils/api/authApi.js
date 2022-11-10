/* eslint-disable */
import { post, put } from './base/index';

export default {
  login: (email, password) => post(`/admin/signin/`, { email, password }),
  esqueceuSenha: (email) => put(`/admin/forgot-password/`, { email }),
  alterarSenha: (newPassword, reset_password_link) =>
    put(`/admin/reset-password/`, { newPassword, reset_password_link }),
};
