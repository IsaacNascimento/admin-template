import { handleActions } from 'redux-actions';
import {
  createProdutoRequest,
  createProdutoSuccess,
  createProdutoError,
  getProdutoRequest,
  getProdutoSuccess,
  getProdutoError,
  updateProdutoRequest,
  updateProdutoSuccess,
  updateProdutoError,
  deleteProdutoRequest,
  deleteProdutoSuccess,
  deleteProdutoError,
  fetchProdutosRequest,
  fetchProdutosSuccess,
  fetchProdutosError,
  fetchSearchProdutosRequest,
  fetchSearchProdutosSuccess,
  fetchSearchProdutosError,
  newProdutoRequest,
} from '../actions/produtoActions';

const defaultState = {
  produtos: [],
  totalPages: 0,
  produto: {},
  count: 0,
  isFetching: false,
  isUpdating: false,
  error: null,
};

export default handleActions(
  {
    [fetchProdutosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchProdutosSuccess](state, { payload }) {
      return {
        ...state,
        produtos: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchProdutosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchSearchProdutosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSearchProdutosSuccess](state, { payload }) {
      return {
        ...state,
        produtos: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchSearchProdutosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },

    [getProdutoRequest](state) {
      return {
        ...state,
        produto: {},
        isFetching: true,
        error: null,
      };
    },
    [getProdutoSuccess](state, { payload }) {
      return {
        ...state,
        produto: payload,
        isFetching: false,
        error: null,
      };
    },
    [getProdutoError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [createProdutoRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [createProdutoSuccess](state, { payload }) {
      return {
        ...state,
        produto: payload,
        isUpdating: false,
        error: null,
      };
    },
    [createProdutoError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [updateProdutoRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [updateProdutoSuccess](state, { payload }) {
      return {
        ...state,
        produto: payload,
        isUpdating: false,
        error: null,
      };
    },
    [updateProdutoError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [deleteProdutoRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [deleteProdutoSuccess](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: null,
      };
    },
    [deleteProdutoError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [newProdutoRequest](state, { payload }) {
      return {
        ...state,
        produto: {},
        isFetching: false,
        isUpdating: false,
        error: payload,
      };
    },
  },
  defaultState
);
