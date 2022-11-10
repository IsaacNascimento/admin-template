import { handleActions } from 'redux-actions';

import {
  fetchClientesRequest,
  fetchClientesSuccess,
  fetchClientesError,
  fetchSearchClientesRequest,
  fetchSearchClientesSuccess,
  fetchSearchClientesError,
  getClienteRequest,
  getClienteSuccess,
  getClienteError,
  createClienteRequest,
  createClienteSuccess,
  createClientesError,
  updateClienteRequest,
  updateClienteSuccess,
  updateClienteError,
  newClienteRequest,
  importClienteCsvFileRequest,
  importClienteCsvFileSuccess,
  importClienteCsvFileError,
} from '../actions/clienteActions';

const defaultState = {
  clientes: [],
  totalPages: 0,
  cliente: {},
  stats: {},
  ifFetching: false,
  isUpdating: false,
  error: null,
};

export default handleActions(
  {
    [getClienteRequest](state) {
      return {
        ...state,
        cliente: {},
        isFetching: true,
        error: null,
      };
    },
    [getClienteSuccess](state, { payload }) {
      return {
        ...state,
        cliente: payload,
        isFetching: false,
        error: null,
      };
    },
    [getClienteError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchClientesRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchClientesSuccess](state, { payload }) {
      return {
        ...state,
        clientes: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchClientesError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchSearchClientesRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSearchClientesSuccess](state, { payload }) {
      return {
        ...state,
        clientes: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchSearchClientesError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [createClienteRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [createClienteSuccess](state, { payload }) {
      return {
        ...state,
        cliente: payload,
        isUpdating: false,
        error: null,
      };
    },
    [createClientesError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [updateClienteRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [updateClienteSuccess](state, { payload }) {
      return {
        ...state,
        cliente: payload,
        isUpdating: false,
        error: null,
      };
    },
    [updateClienteError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [newClienteRequest](state, { payload }) {
      return {
        ...state,
        cliente: {},
        isFetching: false,
        isUpdating: false,
        error: payload,
      };
    },
    [importClienteCsvFileRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [importClienteCsvFileSuccess](state, { payload }) {
      return {
        ...state,
        clientes: [...state.clientes, ...payload.data.clientes],
        isFetching: false,
        error: null,
      };
    },
    [importClienteCsvFileError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
  },
  defaultState
);
