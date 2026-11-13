import { api } from './api';

export interface Reserva {
    oidReserva: number;
    oidUsuario: number;
    oidQuadra: number;
    datReserva: string;
    horInicio: number;
    vlrReserva: number;
    indConfirmada: boolean;
    indPaga: boolean;
    vlrMultaCancelamento?: number | null;
}

export interface CriarReservaRequest {
    oidUsuario: number;
    oidQuadra: number;
    datReserva: string;
    horInicio: number;
    vlrReserva: number;
}

export const reservaService = {
    // Lista todas as reservas
    async listar(): Promise<Reserva[]> {
        const response = await api.get<Reserva[]>('/reservas');
        return response.data;
    },

    // Busca uma reserva específica por ID
    async buscarPorId(id: number): Promise<Reserva> {
        const response = await api.get<Reserva>(`/reservas/${id}`);
        return response.data;
    },

    // Cria uma nova reserva
    async criar(dados: CriarReservaRequest): Promise<Reserva> {
        const response = await api.post<Reserva>('/reservas', dados);
        return response.data;
    },

    // Deleta/cancela uma reserva por ID
    async deletar(id: number): Promise<void> {
        await api.delete(`/reservas/${id}`);
    }
};