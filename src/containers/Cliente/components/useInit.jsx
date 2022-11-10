import { useEffect, useRef } from 'react';

/** ### Init Hook
 * Executa o hook useEffect uma vez, sem dependencias.
 * Util para tirar o warning de "exhaustive-deps".
 * @param {(...args) => callback} valueToInit Função a ser executada.
 * @param  {...any} args Parâmetros a serem passados para a função.
 * @param {Function} callback Função a ser executada quando o elemento for destruido.
 */
const useInit = (valueToInit, ...args) => {
  const initialOnChange = useRef(() => valueToInit(...args));
  useEffect(() => {
    return initialOnChange.current();
  }, [initialOnChange]);
};

export default useInit;
