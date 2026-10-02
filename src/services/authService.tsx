import { api } from './api';

export interface CriarUsuarioRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface AtualizarUsuarioRequest {
  nome?: string;
  email?: string;
  senha?: string;
}

export interface UsuarioCriadoResponse {
  oidUsuario: number;
  nomUsuario: string;
  nomEmail: string;
}

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

  async cadastrar(dados: CriarUsuarioRequest): Promise<UsuarioCriadoResponse> {
    const response = await api.post<UsuarioCriadoResponse>('/usuarios', dados);
    return response.data;
  },

  async login(dados: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/login', dados);
    return response.data;
  },

  async atualizarUsuario(id: number, dados: AtualizarUsuarioRequest): Promise<UsuarioCriadoResponse> {
    const response = await api.put(`/usuarios/${id}`, dados);
    return response.data;
  },

  logout() {
    localStorage.removeItem('@BeachGroup:token');
    localStorage.removeItem('@BeachGroup:user');
  },
};