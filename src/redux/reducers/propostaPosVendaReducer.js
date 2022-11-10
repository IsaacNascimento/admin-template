import { handleActions } from 'redux-actions';

import {
  getPropostaPosVendaRequest,
  getPropostaPosVendaSuccess,
  getPropostaPosVendaError,
  fetchSearchPropostaPosVendaRequest,
  fetchSearchPropostaPosVendaSuccess,
  fetchSearchPropostaPosVendaError,
} from '../actions/propostaPosVendaAction';

const defaultState = {
  propostaPosVendas: [],
  totalPages: 0,
  propostaPosVenda: {},
  isFetching: false,
  isUpdating: false,
  error: null,
};

export default handleActions(
  {
    [getPropostaPosVendaRequest](state) {
      return {
        ...state,
        propostaPosVenda: {},
        isFetching: true,
      };
    },
    [getPropostaPosVendaSuccess](state, { payload }) {
      return {
        ...state,
        propostaPosVenda: payload,
        isFetching: false,
        error: null,
      };
    },
    [getPropostaPosVendaError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchSearchPropostaPosVendaRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSearchPropostaPosVendaSuccess](state, { payload }) {
      return {
        ...state,
        propostaPosVendas: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchSearchPropostaPosVendaError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
  },
  defaultState
);
