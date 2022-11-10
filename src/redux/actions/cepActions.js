import { createAction } from 'redux-actions';
import { get } from '../../utils/api/base';
import { displayError } from './notificacoesActions';

export const getCEPRequest = createAction('CEP_REQUEST');
export const getCEPSuccess = createAction('CEP_SUCCESS');
export const getCEPError = createAction('CEP_ERROR');

export const newCEPRequest = createAction('NEW_CEP_REQUEST');

const apiUrl = 'https://viacep.com.br/ws/';

export const getCEP = (cep) => async (dispatch) => {
  try {
    dispatch(getCEPRequest());
    const { data } = await get(`${apiUrl}/${cep}/json`, {
      headers: { 'Content-Type': 'application/json' },
    });
    await dispatch(getCEPSuccess(data));
    return data;
  } catch (e) {
    console.log(e);
    dispatch(displayError(e));
    dispatch(getCEPError(e));
  }
};

export const newCep = () => async (dispatch) => {
  dispatch(newCEPRequest());
};
