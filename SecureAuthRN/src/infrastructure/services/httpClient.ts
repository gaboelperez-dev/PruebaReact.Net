import axios from 'axios';

export const BASE_URL = 'http://10.0.2.2:5000'; // Cambia a tu URL pública HTTPS

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
});
