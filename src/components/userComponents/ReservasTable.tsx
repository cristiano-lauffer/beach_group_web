import React, { useEffect, useState } from 'react';
import { reservaService } from '../../services/reservaService';
import type { Reserva } from '../../services/reservaService';
import { TrashIcon } from '@heroicons/react/24/outline';

type ReservasTableProps = {
    onReservaCancelada?: () => void;
};

const ReservasTable = ({ onReservaCancelada }: ReservasTableProps) => {
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [carregando, setCarregando] = useState<boolean>(true);
    const [erro, setErro] = useState<string>('');
    const [excluindoId, setExcluindoId] = useState<number | null>(null);

    const carregarReservas = async () => {
        try {
            setCarregando(true);
            const data = await reservaService.listar();
            setReservas(data);
        } catch (err) {
            console.error('Erro ao buscar reservas:', err);
            setErro('Erro ao carregar a lista de reservas.');
        } finally {
            setCarregando(false);
        }
    };

    const handleCancelar = async (id: number) => {
        const confirmar = window.confirm('Tem certeza de que deseja cancelar esta reserva?');
        if (!confirmar) return;

        setExcluindoId(id);
        setErro('');

        try {
            await reservaService.deletar(id);
            setReservas(prev => prev.filter(r => r.oidReserva !== id));
            if (onReservaCancelada) {
                onReservaCancelada();
            }
        } catch (err) {
            console.error('Erro ao cancelar reserva:', err);
            setErro('Falha ao cancelar a reserva.');
        } finally {
            setExcluindoId(null);
        }
    };

    useEffect(() => {
        carregarReservas();
    }, []);

    // Formata o valor para moeda brasileira
    const formatarValor = (valor?: number) =>
        (valor ?? 0).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

    return (
        <div className="flex flex-col justify-center items-center w-fit bg-white/20 p-4 rounded-4xl backdrop-blur-lg shadow-lg gap-6 m-1">
            <h1 className="text-l font-semibold">
                Lista de reservas
            </h1>

            <div className="w-full rounded-2xl text-sm overflow-x-auto">
                {erro && (
                    <p className="text-red-600 font-semibold mb-3">
                        {erro}
                    </p>
                )}

                {carregando ? (
                    <p className="text-sm text-gray-700">Carregando reservas...</p>
                ) : reservas.length === 0 ? (
                    <p className="text-sm text-gray-700">Nenhuma reserva encontrada.</p>
                ) : (
                    <table className="p-1 border-separate border-spacing-1">
                        <thead>
                            <tr className="text-left">
                                <th>ID</th>
                                <th>Usuário</th> 
                                <th>Quadra</th>
                                <th>Data</th>
                                <th>Horário</th>
                                <th>Valor</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {reservas.map((reserva) => (
                                <tr key={reserva.oidReserva}>
                                    <td className="bg-white/20 px-3">
                                        {reserva.oidReserva}
                                    </td>

                                    {/* Exibe o nome do usuário vindo da API, ou fallback para o ID caso o backend ainda não retorne o nome */}
                                    <td className="bg-white/20 p-1 font-medium">
                                        {(reserva as any).nomeUsuario || (reserva as any).nome || `ID: ${reserva.oidUsuario}`}
                                    </td>

                                    <td className="bg-white/20 p-1">
                                        Quadra #{reserva.oidQuadra}
                                    </td>

                                    <td className="bg-white/20 p-1">
                                        {new Date(reserva.datReserva).toLocaleDateString('pt-BR')}
                                    </td>

                                    <td className="bg-white/20 p-1">
                                        {reserva.horInicio}:00h
                                    </td>

                                    <td className="bg-white/20 p-1">
                                        {formatarValor(reserva.vlrReserva)}
                                    </td>

                                    <td className="bg-white/20 p-1 flex justify-center items-center">
                                        <button
                                            type="button"
                                            disabled={excluindoId === reserva.oidReserva}
                                            onClick={() => handleCancelar(reserva.oidReserva)}
                                            title="Cancelar reserva"
                                            className="rounded-full p-1 cursor-pointer bg-white/30 hover:bg-red-200 disabled:opacity-50 mx-1"
                                        >
                                            <TrashIcon
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ReservasTable;