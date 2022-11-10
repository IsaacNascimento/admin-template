import { JWT_KEY } from './constants';
import { regexFiltrarNaN, regexMaskTelefone } from './constants';

export * from './constants';

export const getToken = () => {
  const usuario = JSON.parse(localStorage.getItem(JWT_KEY));

  if (usuario) {
    return usuario.token;
  } else {
    return '';
  }
};

export const getUserId = () => {
  const { usuario } = JSON.parse(localStorage.getItem(JWT_KEY));
  if (usuario) {
    return usuario._id;
  } else {
    return '';
  }
};

export const listaTipoProduto = [
  { value: '1', label: 'Saque Antecipação FGTS', tipo: 'produto' },
  { value: '2', label: 'Empréstimo Consignado' },
];

export const listaSituacaoProduto = [
  { value: true, label: 'Ativo' },
  { value: false, label: 'Inativo' },
];

export const listaSituacaoParceiro = [
  { value: true, label: 'Ativo' },
  { value: false, label: 'Inativo' },
];

export const priceFormatter = (price, display = true) => {
  if (typeof price === 'string') {
    price = parseFloat(
      price.replace(/[^\d,.]+/, '').replace(/(,)(?!.*,)/, '.')
    );
  }
  if (price) {
    price = price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    if (!display) {
      price = price.replace(/([R$ ])+/, '');
    }
    return price;
  } else return '';
};

export const formatarCpf = (value) => {
  return value
    ?.replace(regexFiltrarNaN, '')
    ?.replace(/(\d{3})(\d)/, '$1.$2')
    ?.replace(/(\d{3})(\d)/, '$1.$2')
    ?.replace(/(\d{3})(\d)/, '$1-$2')
    ?.replace(/(-\d{2})\d+?$/, '$1');
};

export const telefoneMask = (value) => {
  const cleaned = value?.replace(regexFiltrarNaN, '');
  const match = cleaned?.match(regexMaskTelefone)?.groups;

  if (!match) return cleaned;

  for (let i in match) {
    if (!match[i]) {
      match[i] = '';
    }
  }
  if (match.long) return match.long.substr(0, 11);

  if (match.ddd && !match.first) return match.ddd;

  if (match.last) return `(${match.ddd}) ${match.first}-${match.last}`;

  if (match.first) return `(${match.ddd}) ${match.first}`;

  return cleaned;
};

export const cepMask = (value) => {
  return (
    value
      /* não deixa ser digitado nenhuma letra */
      .replace(regexFiltrarNaN, '')
      /* captura 1 grupos de número com 5 digitos, 
      adicionando um '-' entre eles */
      .replace(/(\d{5})(\d)/, '$1-$2')
      /* captura 2 grupos, um com 2 números e o resto, e elimina o resto */
      .replace(/(-\d{3})\d+?$/, '$1')
  );
};

export const bancoMask = (value) => {
  return value.replace(regexFiltrarNaN, '').replace(/(\d{3})(\d)/, '$1');
};

export const agenciaMask = (value) => {
  return value.replace(regexFiltrarNaN, '').replace(/(\d{4})(\d)/, '$1');
};

export const formatarConta = (value) => {
  return value
    .replace(regexFiltrarNaN, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1-$2')
    .replace(/(-\d{1})\d+?$/, '$1');
};

export const formatFields = (fields, formRef) => {
  const { values } = formRef.current.getState();
  for (let field of fields) {
    const { name, mask } = field;
    values[name] && formRef.current.change(name, mask(values[name]));
  }
};

export const listaUF = [
  'AC',
  'AL',
  'AM',
  'AP',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MG',
  'MS',
  'MT',
  'PA',
  'PB',
  'PE',
  'PI',
  'PR',
  'RJ',
  'RN',
  'RO',
  'RR',
  'RS',
  'SC',
  'SE',
  'SP',
  'TO',
];
