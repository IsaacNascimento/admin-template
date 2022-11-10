import { handleActions } from 'redux-actions';

import {
  getProcessoRequest,
  getProcessoSuccess,
  getProcessoError,
  fetchProcessosRequest,
  fetchProcessosSuccess,
  fetchProcessosError,
  fetchSearchProcessosRequest,
  fetchSearchProcessosSuccess,
  fetchSearchProcessosError,
} from '../actions/processoActions';

const defaultState = {
  processos: [],
  totalPages: 0,
  processo: {},
  isFetching: false,
  isUpdating: false,
  error: null,
};

export default handleActions(
  {
    [getProcessoRequest](state) {
      return {
        ...state,
        processo: {},
        isFetching: true,
        error: null,
      };
    },
    [getProcessoSuccess](state, { payload }) {
      return {
        ...state,
        processo: payload,
        isFetching: false,
        error: null,
      };
    },
    [getProcessoError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchProcessosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchProcessosSuccess](state, { payload }) {
      return {
        ...state,
        processos: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchProcessosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchSearchProcessosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSearchProcessosSuccess](state, { payload }) {
      return {
        ...state,
        processos: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchSearchProcessosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
  },
  defaultState
);
