import axios from 'axios';
import qs from 'qs'
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

interface HttpResponse<T = unknown> {
  code: number;
  msg: string;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.defaults.paramsSerializer = (params) => {
  return qs.stringify(params, { arrayFormat: 'brackets' });
};

axios.interceptors.request.use(
  // Do something before request is sent
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) config.headers = {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // Do something with request error
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    if (res.code === 0) return res;

    // If the custom code is not 0, it is judged as an error.
    Message.error({
      content: res.msg || 'Error',
      duration: 5 * 1000,
    });
    return Promise.reject(new Error(res.msg || 'Error'));
  },
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
