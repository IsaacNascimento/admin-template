import { deleteRequest, get, post, put } from './base/index';
import { API, getUserId } from '../helpers';

export default {
  getListaFgtsBancoPan: () => get(`${API}/fgts/bancopan/listas`),
};
