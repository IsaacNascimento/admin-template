import { handleActions } from 'redux-actions';
import {
  getCEPRequest,
  getCEPSuccess,
  newCEPRequest,
  getCEPError,
} from '../actions/cepActions';

const defaultState = {
  cep: undefined,
  isFetching: false,
};

export default handleActions(
  {
    [getCEPRequest](state) {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    },
    [getCEPSuccess](state, { payload }) {
      return {
        ...state,
        cep: payload,
        isFetching: false,
        error: null,
      };
    },
    [getCEPError](state, { payload }) {
      return {
        ...state,
        isFetching: false,
        error: payload,
      };
    },
    [newCEPRequest]() {
      return defaultState;
    },
  },
  defaultState
);
