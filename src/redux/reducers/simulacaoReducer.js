import { handleActions } from 'redux-actions';
import {
  getSimulacaoRequest,
  getSimulacaoSuccess,
  fetchSimulacoesRequest,
  fetchSimulacoesSuccess,
  fetchSearchSimulacoesRequest,
  fetchSearchSimulacoessSuccess,
  getStatsSimulacoesRequest,
  getStatsSimulacoesSuccess,
} from '../actions/simulacaoActions';

const defaultState = {
  simulacoes: [],
  totalPages: 0,
  simulacao: {},
  stats: {},
  isUpdating: false,
  isFetching: false,
  error: null,
};

export default handleActions(
  {
    [getSimulacaoRequest](state) {
      return {
        ...state,
        simulacao: {},
        isFetching: true,
        error: null,
      };
    },
    [getSimulacaoSuccess](state, { payload }) {
      return {
        ...state,
        simulacao: payload,
        isFetching: false,
        error: null,
      };
    },
    [fetchSimulacoesRequest](state) {
      return {
        ...state,
        simulacoes: [],
        isFetching: true,
        error: null,
      };
    },
    [fetchSimulacoesSuccess](state, { payload }) {
      return {
        ...state,
        simulacoes: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchSearchSimulacoesRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSearchSimulacoessSuccess](state, { payload }) {
      return {
        ...state,
        simulacoes: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [getStatsSimulacoesRequest](state) {
      return {
        ...state,
        stats: {},
        isFetching: true,
        error: null,
      };
    },
    [getStatsSimulacoesSuccess](state, { payload }) {
      return {
        ...state,
        stats: payload,
        isFetching: false,
        error: null,
      };
    },
  },
  defaultState
);
