import { get, post } from './base/index';
import { API, getUserId } from '../helpers';

export default {
  fetchSimulacoes: (page, pageSize) =>
    get(
      `${API}/admin/simulacoes/${getUserId()}?page=${page}&pageSize=${pageSize}`
    ),
  searchSimulacoes: (page, pageSize, pesquisa) =>
    post(
      `${API}/admin/simulacoes/search/${getUserId()}?page=${page}&pageSize=${pageSize}`,
      pesquisa
    ),
  getSimulacao: (id) => get(`${API}/admin/simulacao/${id}/${getUserId()}`),
  getStatsSimulacoes: () => get(`${API}/admin/simulacoes/stats/${getUserId()}`),
};
