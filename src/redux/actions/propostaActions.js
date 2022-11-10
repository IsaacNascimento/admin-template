import { createAction } from 'redux-actions';
import { displayError } from './notificacoesActions';
import propostasApi from '../../utils/api/propostaApi';

export const fetchPropostasRequest = createAction('FETCH_PROPOSTAS_REQUEST');
export const fetchPropostasSuccess = createAction('FETCH_PROPOSTAS_SUCCESS');
export const getPropostaRequest = createAction('GET_PROPOSTA_REQUEST');
export const getPropostaSuccess = createAction('GET_PROPOSTA_SUCCESS');
export const fetchSearchPropostasRequest = createAction(
  'FETCH_SEARCH_Propostas_REQUEST'
);
export const fetchSearchPropostassSuccess = createAction(
  'FETCH_SEARCH_PROPOSTAS_SUCCESS'
);
export const getStatsPropostasRequest = createAction(
  'GET_STATS_PROPOSTAS_REQUEST'
);
export const getStatsPropostasSuccess = createAction(
  'GET_STATS_PROPOSTAS_SUCCESS'
);

export const fetchPropostas = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchPropostasRequest());
    const { data } = await propostasApi.fetchPropostas(page, pageSize);
    dispatch(fetchPropostasSuccess(data));
  } catch (e) {
    dispatch(displayError(e));
  }
};

export const fetchSearchPropostas =
  (page, pageSize, search) => async (dispatch) => {
    try {
      dispatch(fetchSearchPropostasRequest());
      const { data } = await propostasApi.searchPropostas(
        page,
        pageSize,
        search
      );
      dispatch(fetchSearchPropostassSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(displayError(e));
    }
  };
export const getProposta = (id) => async (dispatch) => {
  try {
    dispatch(getPropostaRequest());
    const { data } = await propostasApi.getProposta(id);
    dispatch(getPropostaSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(displayError(e));
  }
};

export const getStatsPropostas = () => async (dispatch) => {
  try {
    dispatch(getStatsPropostasRequest());
    const { data } = await propostasApi.getStatsPropostas();
    dispatch(getStatsPropostasSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(displayError(e));
  }
};
