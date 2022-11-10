import { createAction } from 'redux-actions';
import { displayError, displaySuccess } from './notificacoesActions';
import clientesApi from '../../utils/api/clienteApi';

export const createClienteRequest = createAction('CREATE_CLIENTE_REQUEST');
export const createClienteSuccess = createAction('CREATE_CLIENTE_SUCCESS');
export const createClientesError = createAction('CREATE_CLIENTE_ERROR');

export const getClienteRequest = createAction('GET_CLIENTE_REQUEST');
export const getClienteSuccess = createAction('GET_CLIENTE_SUCCESS');
export const getClienteError = createAction('GET_CLIENTE_ERROR');

export const updateClienteRequest = createAction('UPDATE_CLIENTE_REQUEST');
export const updateClienteSuccess = createAction('UPDATE_CLIENTE_SUCCESS');
export const updateClienteError = createAction('UPDATE_CLIENTE_ERROR');

export const deleteClienteRequest = createAction('DELETE_CLIENTE_REQUEST');
export const deleteClienteSuccess = createAction('DELETE_CLIENTE_SUCCESS');
export const deleteClienteError = createAction('DELETE_CLIENTE_ERROR');

export const fetchClientesRequest = createAction('FETCH_CLIENTES_REQUEST');
export const fetchClientesSuccess = createAction('FETCH_CLIENTES_SUCCESS');
export const fetchClientesError = createAction('FETCH_CLIENTES_ERROR');

export const fetchSearchClientesRequest = createAction(
  'FETCH_SEARCH_CLIENTES_REQUEST'
);
export const fetchSearchClientesSuccess = createAction(
  'FETCH_SEARCH_CLIENTES_SUCCESS'
);
export const fetchSearchClientesError = createAction(
  'FETCH_SEARCH_CLIENTES_ERROR'
);

export const newClienteRequest = createAction('NEW_CLIENTE_REQUEST');

export const importClienteCsvFileRequest = createAction(
  'IMPORT_CLIENTE_CSV_FILE_REQUEST'
);
export const importClienteCsvFileSuccess = createAction(
  'IMPORT_CLIENTE_CSV_FILE_SUCCESS'
);
export const importClienteCsvFileError = createAction(
  'IMPORT_CLIENTE_CSV_FILE_ERROR'
);

export const fetchClientes = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchClientesRequest());
    const { data } = await clientesApi.fetchClientes(page, pageSize);
    dispatch(fetchClientesSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(fetchClientesError(e));
    dispatch(displayError(e));
  }
};

export const getCliente = (id) => async (dispatch) => {
  try {
    dispatch(getClienteRequest());
    const { data } = await clientesApi.getCliente(id);
    dispatch(getClienteSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(getClienteError(e));
    dispatch(displayError(e));
  }
};

export const fetchSearchClientes =
  (page, pageSize, search) => async (dispatch) => {
    try {
      dispatch(fetchSearchClientesRequest());
      const { data } = await clientesApi.searchClientes(page, pageSize, search);
      dispatch(fetchSearchClientesSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(fetchSearchClientesError(e));
      dispatch(displayError(e));
    }
  };

export const createCliente = (form) => async (dispatch) => {
  try {
    dispatch(createClienteRequest());
    const { data } = await clientesApi.createCliente(form);
    dispatch(displaySuccess('Cliente incluído com sucesso!'));
    dispatch(createClienteSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(createClientesError(e));
    dispatch(displayError(e));
  }
};

export const updateCliente = (id, form) => async (dispatch) => {
  try {
    dispatch(updateClienteRequest());
    const { data } = await clientesApi.updateCliente(id, form);
    dispatch(displaySuccess('Cliente atualizado com sucesso!'));
    dispatch(updateClienteSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(updateClienteError(e));
    dispatch(displayError(e));
  }
};

export const newUsuario = () => async (dispatch) => {
  dispatch(newClienteRequest());
};

export const importClienteCsvFile = (form) => async (dispatch) => {
  try {
    dispatch(importClienteCsvFileRequest());
    const { data } = await clientesApi.importarClienteCsv(form);
    console.log(data);
    dispatch(importClienteCsvFileSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(importClienteCsvFileError(e));
    dispatch(displayError(e));
  }
};
