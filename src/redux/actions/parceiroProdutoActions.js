import { createAction } from 'redux-actions';
import { displayError, displaySuccess } from './notificacoesActions';
import parceiroProdutoApi from '../../utils/api/parceiroProdutoApi';

export const fetchParceiroProdutosRequest = createAction(
  'FETCH_PARCEIROPRODUTOS_REQUEST'
);
export const fetchParceiroProdutosSuccess = createAction(
  'FETCH_PARCEIROPRODUTOS_SUCCESS'
);
export const fetchParceiroProdutosError = createAction(
  'FETCH_PARCEIROPRODUTOS_ERROR'
);

export const fetchParceiroProdutos = () => async (dispatch) => {
  try {
    dispatch(fetchParceiroProdutosRequest());
    const { data } = await parceiroProdutoApi.fetchParceiroProdutos();
    dispatch(fetchParceiroProdutosSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(fetchParceiroProdutosError(e));
    dispatch(displayError(e));
  }
};
