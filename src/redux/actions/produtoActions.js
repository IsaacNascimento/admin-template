import { createAction } from 'redux-actions';
import { displayError, displaySuccess } from './notificacoesActions';
import produtosApi from '../../utils/api/produtoApi';

export const createProdutoRequest = createAction('CREATE_PRODUTO_REQUEST');
export const createProdutoSuccess = createAction('CREATE_PRODUTO_SUCCESS');
export const createProdutoError = createAction('CREATE_PRODUTO_ERROR');

export const getProdutoRequest = createAction('GET_PRODUTO_REQUEST');
export const getProdutoSuccess = createAction('GET_PRODUTO_SUCCESS');
export const getProdutoError = createAction('GET_PRODUTO_ERROR');

export const updateProdutoRequest = createAction('UPDATE_PRODUTO_REQUEST');
export const updateProdutoSuccess = createAction('UPDATE_PRODUTO_SUCCESS');
export const updateProdutoError = createAction('UPDATE_PRODUTO_ERROR');

export const deleteProdutoRequest = createAction('DELETE_PRODUTO_REQUEST');
export const deleteProdutoSuccess = createAction('DELETE_PRODUTO_SUCCESS');
export const deleteProdutoError = createAction('DELETE_PRODUTO_ERROR');

export const fetchProdutosRequest = createAction('FETCH_PROUTOS_REQUEST');
export const fetchProdutosSuccess = createAction('FETCH_PROUTOS_SUCCESS');
export const fetchProdutosError = createAction('FETCH_PROUTOS_ERROR');

export const fetchSearchProdutosRequest = createAction(
  'FETCH_SEARCH_PRODUTOS_REQUEST'
);
export const fetchSearchProdutosSuccess = createAction(
  'FETCH_SEARCH_PRODUTOS_SUCCESS'
);
export const fetchSearchProdutosError = createAction(
  'FETCH_SEARCH_PRODUTOS_ERROR'
);

export const newProdutoRequest = createAction('NEW_PRODUTO_REQUEST');

export const fetchProdutos = (page, pageSize) => async (dispatch) => {
  try {
    dispatch(fetchProdutosRequest());
    const { data } = await produtosApi.listProdutos(page, pageSize);
    dispatch(fetchProdutosSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(fetchProdutosError(e));
    dispatch(displayError(e));
  }
};

export const getProduto = (id) => async (dispatch) => {
  try {
    dispatch(getProdutoRequest());
    const { data } = await produtosApi.readProduto(id);
    dispatch(getProdutoSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(getProdutoError(e));
    dispatch(displayError(e));
  }
};

export const createProduto = (form) => async (dispatch) => {
  try {
    dispatch(createProdutoRequest());
    const { data } = await produtosApi.createProduto(form);
    dispatch(displaySuccess('Produto incluído com sucesso!'));
    dispatch(createProdutoSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(createProdutoError(e));
    dispatch(displayError(e));
  }
};

export const updateProduto = (id, form) => async (dispatch) => {
  try {
    dispatch(updateProdutoRequest());
    const { data } = await produtosApi.updateProduto(id, form);
    dispatch(displaySuccess('Produto atualizado com sucesso!'));
    dispatch(updateProdutoSuccess(data));
  } catch (e) {
    console.log(e);
    dispatch(updateProdutoError(e));
    dispatch(displayError(e));
  }
};

export const deleteProduto = (id) => async (dispatch) => {
  try {
    dispatch(deleteProdutoRequest());
    const { data } = await produtosApi.deleteProduto(id);
    dispatch(deleteProdutoSuccess(data.message));
    dispatch(displaySuccess(data.message));
  } catch (e) {
    console.log(e);
    dispatch(deleteProdutoError(e));
    dispatch(displayError(e));
  }
};

export const fetchSearchProdutos =
  (page, pageSize, search) => async (dispatch) => {
    try {
      dispatch(fetchSearchProdutosRequest());
      const { data } = await produtosApi.searchProdutos(page, pageSize, search);
      dispatch(fetchSearchProdutosSuccess(data));
    } catch (e) {
      console.log(e);
      dispatch(fetchSearchProdutosError(e));
      dispatch(displayError(e));
    }
  };

export const newProduto = () => async (dispatch) => {
  dispatch(newProdutoRequest());
};
