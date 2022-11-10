import { handleActions } from 'redux-actions';

import {
  getListaFgtsBancoPanRequest,
  getListaFgtsBancoPanSuccess,
  getListaFgtsBancoPanError,
} from '../actions/utilActions';

const defaultState = {
  listaFgtsBancoPan: [],
  isFetching: false,
  error: null,
};

export default handleActions(
  {
    [getListaFgtsBancoPanRequest](state) {
      return {
        ...state,
        listaFgtsBancoPan: [],
        isFetching: true,
        error: null,
      };
    },
    [getListaFgtsBancoPanSuccess](state, { payload }) {
      return {
        ...state,
        listaFgtsBancoPan: payload,
        isFetching: false,
        error: null,
      };
    },
    [getListaFgtsBancoPanError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
  },
  defaultState
);
