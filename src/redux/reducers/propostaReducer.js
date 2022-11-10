import { handleActions } from 'redux-actions';
import {
  getPropostaRequest,
  getPropostaSuccess,
  fetchPropostasRequest,
  fetchPropostasSuccess,
  fetchSearchPropostasRequest,
  fetchSearchPropostassSuccess,
  getStatsPropostasRequest,
  getStatsPropostasSuccess,
} from '../actions/propostaActions';

const defaultState = {
  propostas: [],
  totalPages: 0,
  simulacao: {},
  stats: {},
  isUpdating: false,
  isFetching: false,
  error: null,
};

export default handleActions(
  {
    [getPropostaRequest](state) {
      return {
        ...state,
        proposta: {},
        isFetching: true,
        error: null,
      };
    },
    [getPropostaSuccess](state, { payload }) {
      return {
        ...state,
        proposta: payload,
        isFetching: false,
        error: null,
      };
    },
    [fetchPropostasRequest](state) {
      return {
        ...state,
        propostas: [],
        isFetching: true,
        error: null,
      };
    },
    [fetchPropostasSuccess](state, { payload }) {
      return {
        ...state,
        propostas: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchSearchPropostasRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSearchPropostassSuccess](state, { payload }) {
      return {
        ...state,
        propostas: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [getStatsPropostasRequest](state) {
      return {
        ...state,
        stats: {},
        isFetching: true,
        error: null,
      };
    },
    [getStatsPropostasSuccess](state, { payload }) {
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
