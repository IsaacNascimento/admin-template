import { createAction } from 'redux-actions';
import { displayError } from './notificacoesActions';
import simulacoesApi from '../../utils/api/simulacaoApi';

export const fetchSimulacoesRequest = createAction('FETCH_SIMULACOES_REQUEST');
export const fetchSimulacoesSuccess = createAction('FETCH_SIMULACOES_SUCCESS');
export const getSimulacaoRequest = createAction('GET_SIMULACAO_REQUEST');
export const getSimulacaoSuccess = createAction('GET_SIMULACAO_SUCCESS');
export const fetchSearchSimulacoesRequest = createAction(
  'FETCH_SEARCH_Simulacoes_REQUEST'
);
export const fetchSearchSimulacoessSuccess = createAction(
  'FETCH_SEARCH_SIMULACOES_SUCCESS'
);
export const getStatsSimulacoesRequest = createAction(
  'GET_STATS_SIMULACOES_REQUEST'
);
export const getStatsSimulacoesSuccess = createAction(
  'GET_STATS_SIMULACOES_SUCCESS'
);

export const fetchSimulacoes = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchSimulacoesRequest());
    const { data } = await simulacoesApi.fetchSimulacoes(page, pageSize);
    dispatch(fetchSimulacoesSuccess(data));
  } catch (e) {
    dispatch(displayError(e));
  }
};

export const fetchSearchSimulacoes =
  (page, pageSize, search) => async (dispatch) => {
    try {
      dispatch(fetchSearchSimulacoesRequest());
      const { data } = await simulacoesApi.searchSimulacoes(
        page,
        pageSize,
        search
      );
      dispatch(fetchSearchSimulacoessSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(displayError(e));
    }
  };
export const getSimulacao = (id) => async (dispatch) => {
  try {
    dispatch(getSimulacaoRequest());
    const { data } = await simulacoesApi.getSimulacao(id);
    dispatch(getSimulacaoSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(displayError(e));
  }
};

export const getStatsSimulacoes = () => async (dispatch) => {
  try {
    dispatch(getStatsSimulacoesRequest());
    const { data } = await simulacoesApi.getStatsSimulacoes();
    dispatch(getStatsSimulacoesSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(displayError(e));
  }
};
