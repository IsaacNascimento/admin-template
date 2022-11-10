import { createAction } from 'redux-actions';
import { displayError, displaySuccess } from './notificacoesActions';
import parceirosApi from '../../utils/api/parceiroApi';

export const createParceiroRequest = createAction('CREATE_PARCEIRO_REQUEST');
export const createParceiroSuccess = createAction('CREATE_PARCEIRO_SUCCESS');
export const createParceiroError = createAction('CREATE_PARCEIRO_ERROR');

export const getParceiroRequest = createAction('GET_PARCEIRO_REQUEST');
export const getParceiroSuccess = createAction('GET_PARCEIRO_SUCCESS');
export const getParceiroError = createAction('GET_PARCEIRO_ERROR');

export const updateParceiroRequest = createAction('UPDATE_PARCEIRO_REQUEST');
export const updateParceiroSuccess = createAction('UPDATE_PARCEIRO_SUCCESS');
export const updateParceiroError = createAction('UPDATE_PARCEIRO_ERROR');

export const deleteParceiroRequest = createAction('DELETE_PARCEIRO_REQUEST');
export const deleteParceiroSuccess = createAction('DELETE_PARCEIRO_SUCCESS');
export const deleteParceiroError = createAction('DELETE_PARCEIRO_ERROR');

export const fetchParceirosRequest = createAction('FETCH_PARCEIROS_REQUEST');
export const fetchParceirosSuccess = createAction('FETCH_PARCEIROS_SUCCESS');
export const fetchParceirosError = createAction('FETCH_PARCEIROS_ERROR');

export const fetchSearchParceirosRequest = createAction(
  'FETCH_SEARCH_PARCEIROS_REQUEST'
);
export const fetchSearchParceirosSuccess = createAction(
  'FETCH_SEARCH_PARCEIROS_SUCCESS'
);
export const fetchSearchParceirosError = createAction(
  'FETCH_SEARCH_PARCEIROS_ERROR'
);

export const newParceiroRequest = createAction('NEW_PRODUTO_REQUEST');

export const fetchParceiros = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchParceirosRequest());
    const { data } = await parceirosApi.listParceiros(page, pageSize);
    dispatch(fetchParceirosSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(fetchParceirosError(e));
    dispatch(displayError(e));
  }
};

export const getParceiro = (id) => async (dispatch) => {
  try {
    dispatch(getParceiroRequest());
    const { data } = await parceirosApi.readParceiro(id);
    dispatch(getParceiroSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(getParceiroError(e));
    dispatch(displayError(e));
  }
};

export const createParceiro = (form) => async (dispatch) => {
  try {
    dispatch(createParceiroRequest());
    const { data } = await parceirosApi.createParceiro(form);
    dispatch(displaySuccess('Parceiro incluído com sucesso!'));
    dispatch(createParceiroSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(createParceiroError(e));
    dispatch(displayError(e));
  }
};

export const updateParceiro = (id, form) => async (dispatch) => {
  try {
    dispatch(updateParceiroRequest());
    const { data } = await parceirosApi.updateParceiro(id, form);
    dispatch(displaySuccess('Parceiro atualizado com sucesso!'));
    dispatch(updateParceiroSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(updateParceiroError(e));
    dispatch(displayError(e));
  }
};

export const deleteParceiro = (id) => async (dispatch) => {
  try {
    dispatch(deleteParceiroRequest());
    const { data } = await parceirosApi.deleteParceiro(id);
    dispatch(deleteParceiroSuccess(data.message));
    dispatch(displaySuccess(data.message));
  } catch (e) {
    console.log(e);
    dispatch(deleteParceiroError(e));
    dispatch(displayError(e));
  }
};

export const fetchSearchParceiros =
  (page, pageSize, search) => async (dispatch) => {
    try {
      dispatch(fetchSearchParceirosRequest());
      const { data } = await parceirosApi.searchParceiros(
        page,
        pageSize,
        search
      );
      dispatch(fetchSearchParceirosSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(fetchSearchParceirosError(e));
      dispatch(displayError(e));
    }
  };

export const newParceiro = () => async (dispatch) => {
  dispatch(newParceiroRequest());
};
