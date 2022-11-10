import { createAction } from 'redux-actions';
import { displayError, displaySuccess } from './notificacoesActions';
import processoApi from '../../utils/api/processoApi';

export const getProcessoRequest = createAction('GET_PROCESSO_REQUEST');
export const getProcessoSuccess = createAction('GET_PROCESSO_SUCCESS');
export const getProcessoError = createAction('GET_PROCESSO_ERROR');

export const fetchProcessosRequest = createAction('FETCH_PROCESSOS_REQUEST');
export const fetchProcessosSuccess = createAction('FETCH_PROCESSOS_SUCCESS');
export const fetchProcessosError = createAction('FETCH_PROCESSOS_ERROR');

export const fetchSearchProcessosRequest = createAction(
  'FETCH_SEARCH_PROCESSOS_REQUEST'
);
export const fetchSearchProcessosSuccess = createAction(
  'FETCH_SEARCH_PROCESSOS_SUCCESS'
);
export const fetchSearchProcessosError = createAction(
  'FETCH_SEARCH_PROCESSOS_ERROR'
);

export const getProcesso = (id) => async (dispatch) => {
  try {
    dispatch(getProcessoRequest());
    const { data } = await processoApi.getProcesso(id);
    dispatch(getProcessoSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(getProcessoError(e));
    dispatch(displayError(e));
  }
};

export const fetchProcessos = async (page, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchProcessosRequest());
    const { data } = await processoApi.fetchProcessos(page, pageSize);
    dispatch(fetchProcessosSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(fetchProcessosError(e));
    dispatch(displayError(e));
  }
};

export const FetchSearchProcessos =
  (page, pageSize, search) => async (dispatch) => {
    try {
      dispatch(fetchSearchProcessosRequest());
      const { data } = await processoApi.searchProcessos(
        page,
        pageSize,
        search
      );
      dispatch(fetchSearchProcessosSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(fetchSearchProcessosError(e));
      dispatch(displayError(e));
    }
  };
