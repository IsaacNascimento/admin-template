import { get, post, put, deleteRequest } from './base/index';
import { getUserId } from '../helpers';

export default {
  createParceiro: (form) => post(`/admin/parceiro/create/${getUserId()}`, form),
  readParceiro: (id) => get(`/admin/parceiro/${id}/${getUserId()}`),
  updateParceiro: (id, form) =>
    put(`/admin/parceiro/${id}/${getUserId()}`, form),
  deleteParceiro: (id) => deleteRequest(`/admin/parceiro/${id}/${getUserId()}`),
  listParceiros: (page, pageSize) =>
    get(`/admin/parceiros/${getUserId()}?page=${page}&pageSize=${pageSize}`),
  searchParceiros: (page, pageSize, searchForm) =>
    post(
      `/admin/parceiros/search/${getUserId()}?page=${page}&pageSize=${pageSize}`,
      searchForm
    ),
};
