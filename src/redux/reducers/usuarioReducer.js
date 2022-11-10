import { handleActions } from 'redux-actions';

import {
  getUsuarioRequest,
  getUsuarioSuccess,
  getUsuarioError,
  fetchUsuariosRequest,
  fetchUsuariosSuccess,
  fetchUsuariosError,
  fetchSearchUsuariosRequest,
  fetchSearchUsuariosSuccess,
  fetchSearchUsuariosError,
  createUsuarioRequest,
  createUsuarioSuccess,
  createUsuarioError,
  updateUsuarioRequest,
  updateUsuarioSuccess,
  updateUsuarioError,
  deleteUsuarioRequest,
  deleteUsuarioSuccess,
  deleteUsuarioError,
  newUsuarioRequest,
} from '../actions/usuarioActions';

const defaultState = {
  usuarios: [],
  totalPages: 0,
  usuario: {},
  isFetching: false,
  isUpdating: false,
  error: null,
};

export default handleActions(
  {
    [getUsuarioRequest](state) {
      return {
        ...state,
        usuario: {},
        isFetching: true,
        error: null,
      };
    },
    [getUsuarioSuccess](state, { payload }) {
      return {
        ...state,
        usuario: payload,
        isFetching: false,
        error: null,
      };
    },
    [getUsuarioError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchUsuariosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchUsuariosSuccess](state, { payload }) {
      return {
        ...state,
        usuarios: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchUsuariosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [fetchSearchUsuariosRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [fetchSearchUsuariosSuccess](state, { payload }) {
      return {
        ...state,
        usuarios: payload.docs,
        totalItems: payload.totalDocs,
        totalPages: payload.totalPages,
        isFetching: false,
        error: null,
      };
    },
    [fetchSearchUsuariosError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [createUsuarioRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [createUsuarioSuccess](state, { payload }) {
      return {
        ...state,
        usuario: payload,
        isUpdating: false,
        error: null,
      };
    },
    [createUsuarioError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [updateUsuarioRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [updateUsuarioSuccess](state, { payload }) {
      return {
        ...state,
        usuario: payload,
        isUpdating: false,
        error: null,
      };
    },
    [updateUsuarioError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [deleteUsuarioRequest](state) {
      return {
        ...state,
        isUpdating: true,
        error: null,
      };
    },
    [deleteUsuarioSuccess](state) {
      return {
        ...state,
        isUpdating: false,
        error: null,
      };
    },
    [deleteUsuarioError](state, { payload }) {
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    },
    [newUsuarioRequest](state, { payload }) {
      return {
        ...state,
        usuario: {},
        isFetching: false,
        isUpdating: false,
        error: payload,
      };
    },
  },
  defaultState
);
