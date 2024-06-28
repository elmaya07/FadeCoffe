import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://menu.pmbistiqomah.cloud/public/api',
  timeout: 10000, // Set a timeout if neededs
});

axiosApi.interceptors.request.use(
  async config => {
    let token = null;
    const value = await AsyncStorage.getItem('auth');
    if (value !== null) {
      token = JSON.parse(value)?.access_token || null;
    }
    console.log(config)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

let retryCount = 0;
const maxRetries = 3;

axiosApi.interceptors.response.use(
  function (response) { 
    retryCount = 0; // Reset retry count jika sukses
    return {...response, status: response.status};
  },
  async error => {
    const {config, response} = error;
    retryCount = 0;
    return Promise.reject(error);
  },
);

//

export default axiosApi;
