import axios from 'axios';
import { API } from '../../constants';
import { getToken } from '../../helpers';

export const defaultParams = () => {
  const token = getToken();
  return {
    baseURL: API,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
};

export default axios;
