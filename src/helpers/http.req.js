import axiosApi from './axiosApi';

export const get = async (url, params) => {
  return await axiosApi.get(url, params);
};

export const post = async (url, data, config = {}) => {
  return await axiosApi.post(url, data, config);
};

export const authPostFormData = (url, data) => {
  return axiosApi.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const authPutFormData = (url, data) => {
  return axiosApi.put(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const del = async (url, params) => {
  return await axiosApi.delete(url, params);
};