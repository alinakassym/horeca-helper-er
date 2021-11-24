import axios from 'axios';
import store from './store/index';
const baseUrl = 'https://horecahelper.kz/backend';

const axiosInstance = axios.create({
  baseURL: `${baseUrl}`,
  headers: {Authorization: ''},
});

axiosInstance.interceptors.request.use(
  config => {
    const hhToken = store.getState().auth.hhToken;
    console.log('axiosInstance hhToken', hhToken);
    if (hhToken) {
      config.headers.Authorization = `Bearer ${hhToken || ''}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
