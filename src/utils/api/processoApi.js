import { get, post, put, deleteRequest } from './base/index';
import { API, getUserId } from '../helpers';

export default {
  getProcesso: (id) =>
    get(`${API}/admin/processoposvenda/${id}/${getUserId()}`),
  fetchProcessos: (page, pageSize) =>
    get(
      `${API}/admin/processoposvenda/${getUserId()}?page=${page}&pageSize=${pageSize}`
    ),
  searchProcessos: (page, pageSize, pesquisa) =>
    post(
      `${API}/admin/processosposvenda/search/${getUserId()}?page=${page}&pageSize=${pageSize}`,
      pesquisa
    ),
};
