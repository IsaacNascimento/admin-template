import { handleActions } from 'redux-actions';
import {
  createParceiroRequest,
  createParceiroSuccess,
  createParceiroError,
  getParceiroRequest,
  getParceiroSuccess,
  getParceiroError,
  updateParceiroRequest,
  updateParceiroSuccess,
  updateParceiroError,
  deleteParceiroRequest,
  deleteParceiroSuccess,
  deleteParceiroError,
  fetchParceirosRequest,
  fetchParceirosSuccess,
  fetchParceirosError,
  fetchSearchParceirosRequest,
  fetchSearchParceirosSuccess,
  fetchSearchParceirosError,
  newParceiroRequest,
} from '../actions/parceiroActions';

const defaultState = {
  parceiros: [],
  totalPages: 0,
  parceiro: {},
  count: 0,
  isFetching: false,
  isUpdating: false,
  error: null,
};

export default handleActions(
  {
    [fetchParceirosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchParceirosSuccess](state, { payload }) {
      return {
        ...state,
        parceiros: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchParceirosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchSearchParceirosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSearchParceirosSuccess](state, { payload }) {
      return {
        ...state,
        parceiros: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchSearchParceirosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },

    [getParceiroRequest](state) {
      return {
        ...state,
        parceiro: {},
        isFetching: true,
        error: null,
      };
    },
    [getParceiroSuccess](state, { payload }) {
      return {
        ...state,
        parceiro: payload,
        isFetching: false,
        error: null,
      };
    },
    [getParceiroError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [createParceiroRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [createParceiroSuccess](state, { payload }) {
      return {
        ...state,
        parceiro: payload,
        isUpdating: false,
        error: null,
      };
    },
    [createParceiroError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [updateParceiroRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [updateParceiroSuccess](state, { payload }) {
      return {
        ...state,
        parceiro: payload,
        isUpdating: false,
        error: null,
      };
    },
    [updateParceiroError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [deleteParceiroRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [deleteParceiroSuccess](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: null,
      };
    },
    [deleteParceiroError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [newParceiroRequest](state, { payload }) {
      return {
        ...state,
        parceiro: {},
        isFetching: false,
        isUpdating: false,
        error: payload,
      };
    },
  },
  defaultState
);
