import { handleActions } from 'redux-actions';
import {
  fetchParceiroProdutosRequest,
  fetchParceiroProdutosSuccess,
  fetchParceiroProdutosError,
} from '../actions/parceiroProdutoActions';

const defaultState = {
  parceiroProdutos: [],
  totalPages: 0,
  parceiroProduto: {},
  count: 0,
  isFetching: false,
  isUpdating: false,
  error: null,
};

export default handleActions(
  {
    [fetchParceiroProdutosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchParceiroProdutosSuccess](state, { payload }) {
      return {
        ...state,
        parceiroProdutos: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchParceiroProdutosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
  },
  defaultState
);
