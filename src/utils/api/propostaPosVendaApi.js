import { get, post, put, deleteRequest } from './base/index';
import { API, getUserId } from '../helpers';

export default {
  getPropostaPosVenda: (id) =>
    get(`${API}/admin/propostaposvenda/${id}/${getUserId()}`),

  searchPropostaPosVenda: (page, pageSize, search) =>
    post(
      `${API}/admin/propostasposvenda/search/${getUserId()}?page=${page}&pageSize=${pageSize}`,
      search
    ),
};
