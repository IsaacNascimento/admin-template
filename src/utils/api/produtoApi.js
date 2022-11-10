import { get, post, put, deleteRequest } from './base/index';
import { getUserId } from '../helpers';

export default {
  createProduto: (form) => post(`/admin/produto/create/${getUserId()}`, form),
  readProduto: (id) => get(`/admin/produto/${id}/${getUserId()}`),
  updateProduto: (id, form) => put(`/admin/produto/${id}/${getUserId()}`, form),
  deleteProduto: (id) => deleteRequest(`/admin/produto/${id}/${getUserId()}`),
  listProdutos: (page, pageSize) =>
    get(`/admin/produtos/${getUserId()}?page=${page}&pageSize=${pageSize}`),
  searchProdutos: (page, pageSize, searchForm) =>
    post(
      `/admin/produtos/search/${getUserId()}?page=${page}&pageSize=${pageSize}`,
      searchForm
    ),
};
