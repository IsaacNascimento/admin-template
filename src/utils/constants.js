export const API = process.env.REACT_APP_API_URL;
export const JWT_KEY = 'CrefadiAdmin';

export const regexFiltrarNaN = /\D+/g;

// Máscara do Número de Telefone
export const regexMaskTelefone =
  /^(?<ddd>\d{2})(?<first>\d{1,5})?(?<last>\d{4})?$|(?<long>\d{12,})/;
