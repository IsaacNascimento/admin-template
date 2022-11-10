import { createAction } from 'redux-actions';
import { displayError, displaySuccess } from './notificacoesActions';
import usuariosApi from '../../utils/api/usuarioApi';

export const getUsuarioRequest = createAction('GET_USUARIO_REQUEST');
export const getUsuarioSuccess = createAction('GET_USUARIO_SUCCESS');
export const getUsuarioError = createAction('GET_USUARIO_ERROR');

export const fetchUsuariosRequest = createAction('FETCH_USUAARIOS_REQUEST');
export const fetchUsuariosSuccess = createAction('FETCH_USUAARIOS_SUCCESS');
export const fetchUsuariosError = createAction('FETCH_USUAARIOS_ERROR');

export const createUsuarioRequest = createAction('CREATE_USUARIO_REQUEST');
export const createUsuarioSuccess = createAction('CREATE_USUARIO_SUCCESS');
export const createUsuarioError = createAction('CREATE_USUARIO_ERROR');

export const updateUsuarioRequest = createAction('UPDATE_USUARIO_REQUEST');
export const updateUsuarioSuccess = createAction('UPDATE_USUARIO_SUCCESS');
export const updateUsuarioError = createAction('UPDATE_USUARIO_ERROR');

export const deleteUsuarioRequest = createAction('DELETE_USUARIO_REQUEST');
export const deleteUsuarioSuccess = createAction('DELETE_USUARIO_SUCCESS');
export const deleteUsuarioError = createAction('DELETE_USUARIO_ERROR');

export const fetchSearchUsuariosRequest = createAction(
  'FETCH_SEARCH_USUARIOS_REQUEST'
);
export const fetchSearchUsuariosSuccess = createAction(
  'FETCH_SEARCH_USUARIOS_SUCCESS'
);
export const fetchSearchUsuariosError = createAction(
  'FETCH_SEARCH_USUARIOS_ERROR'
);

export const newUsuarioRequest = createAction('NEW_USUARIO_REQUEST');

export const getUsuario = (id) => async (dispatch) => {
  try {
    dispatch(getUsuarioRequest());
    const { data } = await usuariosApi.getUsuario(id);
    dispatch(getUsuarioSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(getUsuarioError(e));
    dispatch(displayError(e));
  }
};

export const fetchUsuarios = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchUsuariosRequest());
    const { data } = await usuariosApi.fetchUsuarios(page, pageSize);
    dispatch(fetchUsuariosSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(fetchUsuariosError(e));
    dispatch(displayError(e));
  }
};

export const fetchSearchUsuarios =
  (page, pageSize, search) => async (dispatch) => {
    try {
      dispatch(fetchSearchUsuariosRequest());
      const { data } = await usuariosApi.searchUsuarios(page, pageSize, search);
      dispatch(fetchSearchUsuariosSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(fetchSearchUsuariosError(e));
      dispatch(displayError(e));
    }
  };

export const createUsuario = (form) => async (dispatch) => {
  try {
    dispatch(createUsuarioRequest());
    const { data } = await usuariosApi.createUsuario(form);
    dispatch(displaySuccess('Usuário incluído com sucesso!'));
    dispatch(createUsuarioSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(createUsuarioError(e));
    dispatch(displayError(e));
  }
};

export const updateUsuario = (id, form) => async (dispatch) => {
  try {
    dispatch(updateUsuarioRequest());
    const { data } = await usuariosApi.updateUsuario(id, form);
    dispatch(displaySuccess('Usuario atualizado com sucesso'));
    dispatch(updateUsuarioSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(updateUsuarioError(e));
    dispatch(displayError(e));
  }
};

export const deleteUsuario = (id) => async (dispatch) => {
  try {
    dispatch(deleteUsuarioRequest());
    const { data } = await usuariosApi.deleteUsuario(id);
    dispatch(deleteUsuarioSuccess(data.message));
    dispatch(displaySuccess(data.message));
  } catch (e) {
    console.log(e);
    dispatch(deleteUsuarioError(e));
    dispatch(displayError(e));
  }
};

export const newUsuario = () => async (dispatch) => {
  dispatch(newUsuarioRequest());
};
