import { handleActions } from 'redux-actions';
import {
  displayErrorRequest,
  clearErrorRequest,
  displaySuccessRequest,
  clearSuccessRequest,
} from '../actions/notificacoesActions';

const defaultState = {
  error: null,
  success: null,
};

export default handleActions(
  {
    [displayErrorRequest](state, { payload }) {
      return {
        ...state,
        error: errorHandler(payload),
      };
    },
    [clearErrorRequest](state, { payload }) {
      return {
        ...state,
        error: null,
      };
    },
    [displaySuccessRequest](state, { payload }) {
      return {
        ...state,
        success: payload,
      };
    },
    [clearSuccessRequest](state, { payload }) {
      return {
        ...state,
        success: null,
      };
    },
  },
  defaultState
);

const errorHandler = (data) =>
  data.response
    ? data.response.data
      ? data.response.data.error
        ? data.response.data.error
        : data.response.data.err
        ? data.response.data.err
        : data.message
      : data.response
    : data;
