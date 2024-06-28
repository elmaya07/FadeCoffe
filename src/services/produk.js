import {authPostFormData, authPutFormData, del, get} from '../helpers/http.req';

export const getProduk = params => {
  return get('produk', {params});
};

export const getMeja = params => {
  return get('meja', {params});
};

export const tambahProduk = data => {
  return authPostFormData('tambah-produk', data);
};

export const updateProduk = (data, id) => {
  return authPostFormData(`edit-produk/${id}`, data);
};

export const delProduk = id => {
  return get(`hapus-produk/${id}`, {});
};


export const tambahMeja = data => {
  return authPostFormData('tambah-meja', data);
};

export const updateMeja = (data, id) => {
  return authPostFormData(`edit-meja/${id}`, data);
};

export const delMeja = id => {
  return get(`hapus-meja/${id}`, {});
};
