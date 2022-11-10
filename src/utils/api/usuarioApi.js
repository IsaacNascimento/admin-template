import { deleteRequest, get, post, put } from './base/index';
import { API, getUserId } from '../helpers';

export default {
  getUsuario: (id) => get(`${API}/admin/usuario/${id}/${getUserId()}`),
  fetchUsuarios: (page, pageSize) =>
    get(
      `${API}/admin/usuarios/${getUserId()}?page=${page}&pageSize=${pageSize}`
    ),
  searchUsuarios: (page, pageSize, pesquisa) =>
    post(
      `${API}/admin/usuarios/search/${getUserId()}?page=${page}&pageSize=${pageSize}`,
      pesquisa
    ),
  deleteUsuario: (id) =>
    deleteRequest(`${API}/admin/usuario/${id}/${getUserId()}`),
  createUsuario: (form) =>
    post(`${API}/admin/usuario/create/${getUserId()}`, form),

  updateUsuario: (id, form) =>
    put(`${API}/admin/usuario/${id}/${getUserId()}`, form),
};
