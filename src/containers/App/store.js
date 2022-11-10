import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  sidebarReducer,
  themeReducer,
  rtlReducer,
  authReducer,
  notificacoesReducer,
  simulacaoReducer,
  produtoReducer,
  clienteReducer,
  parceiroReducer,
  cepReducer,
  propostaReducer,
  parceiroProdutoReducer,
  usuarioReducer,
  processoReducer,
  propostaPosVendaReducer,
  utilReducer,
} from '@/redux/reducers/index';

const reducer = combineReducers({
  theme: themeReducer,
  sidebar: sidebarReducer,
  rtl: rtlReducer,
  auth: authReducer,
  notificacoes: notificacoesReducer,
  simulacoes: simulacaoReducer,
  produtos: produtoReducer,
  clientes: clienteReducer,
  parceiros: parceiroReducer,
  cep: cepReducer,
  propostas: propostaReducer,
  parceiroProdutos: parceiroProdutoReducer,
  usuarios: usuarioReducer,
  processos: processoReducer,
  propostaPosVendas: propostaPosVendaReducer,
  util: utilReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
