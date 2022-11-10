import { get, post } from './base/index';
import { API, getUserId } from '../helpers';

export default {
  fetchPropostas: (page, pageSize) =>
    get(
      `${API}/admin/propostas/${getUserId()}?page=${page}&pageSize=${pageSize}`
    ),
  searchPropostas: (page, pageSize, pesquisa) =>
    post(
      `${API}/admin/propostas/search/${getUserId()}?page=${page}&pageSize=${pageSize}`,
      pesquisa
    ),
  getProposta: (id) => get(`${API}/admin/proposta/${id}/${getUserId()}`),
  getStatsPropostas: () => get(`${API}/admin/propostas/stats/${getUserId()}`),
};
