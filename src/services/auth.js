import {post} from '../helpers/http.req';

export const login = data => post('auth/login', data);
export const loginQrcode = data => post('auth/qrcode', data);
export const registrasi = data => post('auth/registrasi', data);
