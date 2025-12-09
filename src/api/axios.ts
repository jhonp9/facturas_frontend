import axios from 'axios';
import { AxiosInstance } from '../../node_modules/axios/index';

// Definimos la URL base asegurándonos de que sea un string
const baseURL: string = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api: AxiosInstance = axios.create({
  baseURL,
  // Opcional: headers por defecto
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;