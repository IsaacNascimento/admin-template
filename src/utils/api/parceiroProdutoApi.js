import { get } from './base/index';
import { getUserId } from '../helpers';

export default {
  fetchParceiroProdutos: () => get(`/admin/parceiroprodutos/${getUserId()}`),
};
