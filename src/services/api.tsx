import axios from 'axios';

// Porta onde a API C# está rodando (ex: https://localhost:7286)
export const api = axios.create({
  baseURL: 'https://localhost:7286/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Adiciona o Token JWT no cabeçalho Authorization em cada requisição
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@BeachGroup:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});