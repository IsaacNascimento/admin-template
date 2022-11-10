import { get, post, put } from './base/index';
import { API, getUserId } from '../helpers';

export default {
  getCliente: (id) => get(`${API}/admin/cliente/${id}/${getUserId()}`),

  fetchClientes: (page, pageSize) =>
    get(
      `${API}/admin/clientes/${getUserId()}?page=${page}&pageSize=${pageSize}`
    ),
  searchClientes: (page, pageSize, pesquisa) =>
    post(
      `${API}/admin/clientes/search/${getUserId()}?page=${page}&pageSize=${pageSize}`,
      pesquisa
    ),
  createCliente: (form) =>
    post(`${API}/admin/cliente/create/${getUserId()}`, form),
  updateCliente: (id, form) =>
    put(`${API}/admin/cliente/${id}/${getUserId()}`, form),
  importarClienteCsv: (form) =>
    post(`/admin/clientes/importar/${getUserId()}`, form),
};
