import { createAction } from 'redux-actions';
import { displayError, displaySuccess } from './notificacoesActions';
import utilApi from '../../utils/api/utilApi';

export const getListaFgtsBancoPanRequest = createAction(
  'GET_LISTAFGTSBANCOPAN_REQUEST'
);
export const getListaFgtsBancoPanSuccess = createAction(
  'GET_LISTAFGTSBANCOPAN_SUCCESS'
);
export const getListaFgtsBancoPanError = createAction(
  'GET_LISTAFGTSBANCOPAN_ERROR'
);

export const newListaFgtsBancoPanRequest = createAction(
  'NEW_LISTAFGTSBANCOPAN_REQUEST'
);

export const getListaFgtsBancoPan = () => async (dispatch) => {
  try {
    dispatch(getListaFgtsBancoPanRequest());
    const { data } = await utilApi.getListaFgtsBancoPan();
    dispatch(getListaFgtsBancoPanSuccess(data));
  } catch (e) {
    console.error(e);
    dispatch(getListaFgtsBancoPanError(e));

    dispatch(displayError(e));
  }
};
