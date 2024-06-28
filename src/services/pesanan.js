import {get, post} from '../helpers/http.req';

export const createPesanan = data => {
  return post('/pesanan', data);
};
export const getPesanan = params => {
  return get(`pesanan`, {params});
};
export const getPenjualan = params => {
  return get(`total-penjualan`, {params});
};
export const getLaporanPenjualan = params => {
  return get(`laporan-penjualan`, {params});
};

export const resetPesanan = params => {
  return get(`reset-pesanan`, {params});
};
