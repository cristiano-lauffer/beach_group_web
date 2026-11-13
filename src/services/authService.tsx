import { api } from './api';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  token: string;
}

export const authService = {
  async login(dados: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', dados);
    return response.data;
  },

  logout() {
    localStorage.removeItem('@BeachGroup:token');
    localStorage.removeItem('@BeachGroup:user');
  },
};