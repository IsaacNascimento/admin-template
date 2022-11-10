import { createAction } from 'redux-actions';
import { displayError, displaySuccess } from './notificacoesActions';
import propostaPosVendaApi from '../../utils/api/propostaPosVendaApi';

export const getPropostaPosVendaRequest = createAction(
  'GET_PROPOSTA_POS_VENDA_REQUEST'
);
export const getPropostaPosVendaSuccess = createAction(
  'GET_PROPOSTA_POS_VENDA_SUCCESS'
);
export const getPropostaPosVendaError = createAction(
  'GET_PROPOSTA_POS_VENDA_ERROR'
);

export const fetchSearchPropostaPosVendaRequest = createAction(
  'FETCH_SEARCH_PROPOSTA_POS_VENDA_REQUEST'
);
export const fetchSearchPropostaPosVendaSuccess = createAction(
  'FETCH_SEARCH_PROPOSTA_POS_VENDA_SUCCESS'
);
export const fetchSearchPropostaPosVendaError = createAction(
  'FETCH_SEARCH_PROPOSTA_POS_VENDA_ERROR'
);

export const getPropostaPosVenda = (id) => async (dispatch) => {
  try {
    dispatch(getPropostaPosVendaRequest());
    const { data } = await propostaPosVendaApi.getPropostaPosVenda(id);
    dispatch(getPropostaPosVendaSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(getPropostaPosVendaError(e));
    dispatch(displayError(e));
  }
};

export const searchPropostaPosVenda =
  (page, pageSize, search) => async (dispatch) => {
    try {
      dispatch(fetchSearchPropostaPosVendaRequest());
      const { data } = await propostaPosVendaApi.searchPropostaPosVenda(
        page,
        pageSize,
        search
      );
      dispatch(fetchSearchPropostaPosVendaSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(fetchSearchPropostaPosVendaError(e));
      dispatch(displayError(e));
    }
  };
