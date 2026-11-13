import { api } from './api';

export interface Quadra {
  oid: number;
  nome: string;
  horFuncionamentoInicio: number;
  horFuncionamentoFim: number;
  vlrQuadra: number;
  datCriacao: string;
  datAlteracao?: string | null;
}

export interface CriarQuadraRequest {
  nome: string;
  horFuncionamentoInicio: number;
  horFuncionamentoFim: number;
  vlrQuadra: number;
}

export const quadraService = {
  // Lista todas as quadras
  async listar(): Promise<Quadra[]> {
    const response = await api.get<Quadra[]>('/quadras');
    return response.data;
  },

  // Busca uma quadra específica por ID
  async buscarPorId(id: number): Promise<Quadra> {
    const response = await api.get<Quadra>(`/quadras/${id}`);
    return response.data;
  },

  // Cadastra uma nova quadra 
  async cadastrar(dados: CriarQuadraRequest): Promise<Quadra> {
    const response = await api.post<Quadra>('/quadras', dados);
    return response.data;
  },

  // Deleta uma quadra por ID 
  async deletar(id: number): Promise<void> {
    await api.delete(`/quadras/${id}`);
  },
};