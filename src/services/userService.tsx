import { api } from './api';

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

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

export const userService = {
  async listar(): Promise<Usuario[]> {
    const response = await api.get<Usuario[]>('/usuarios');
    return response.data;
  },

  async cadastrar(dados: CriarUsuarioRequest): Promise<UsuarioCriadoResponse> {
    const response = await api.post<UsuarioCriadoResponse>('/usuarios', dados);
    return response.data;
  },

  async atualizar(id: number, dados: AtualizarUsuarioRequest): Promise<UsuarioCriadoResponse> {
    const response = await api.put<UsuarioCriadoResponse>(`/usuarios/${id}`, dados);
    return response.data;
  },

  async deletar(id: number): Promise<void> {
    await api.delete(`/usuarios/${id}`);
  },
};