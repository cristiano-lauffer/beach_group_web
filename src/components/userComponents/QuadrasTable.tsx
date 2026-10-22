
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import {
    TrashIcon,
} from '@heroicons/react/24/outline';

interface Quadra {
    oid: number;
    nome: string;
    horFuncionamentoInicio: number;
    horFuncionamentoFim: number;
    vlrQuadra: number;
    datCriacao: string;
    datAlteracao: string | null;
}

export const QuadrasTable: React.FC = () => {
    const navigate = useNavigate();

    const [quadras, setQuadras] = useState<Quadra[]>([]);
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(true);
    const [excluindoId, setExcluindoId] = useState<number | null>(null);

    // Busca todas as quadras
    useEffect(() => {
        const tokenStorage = localStorage.getItem('@BeachGroup:token');

        if (!tokenStorage) {
            navigate('/login');
            return;
        }

        const buscarQuadras = async () => {
            try {
                const response = await api.get<Quadra[]>('/quadras');
                setQuadras(response.data);
            } catch {
                setErro('Erro ao carregar a lista de quadras.');
            } finally {
                setCarregando(false);
            }
        };

        buscarQuadras();
    }, [navigate]);

    // Exclui uma quadra
    const handleDeletarQuadra = async (id: number) => {
        const confirmar = window.confirm(
            'Tem certeza que deseja excluir esta quadra?'
        );

        if (!confirmar) return;

        setExcluindoId(id);
        setErro('');

        try {
            await api.delete(`/quadras/${id}`);

            setQuadras((prev) =>
                prev.filter((quadra) => quadra.oid !== id)
            );
        } catch {
            setErro('Erro ao excluir a quadra. Verifique se ela possui reservas vinculadas.');
        } finally {
            setExcluindoId(null);
        }
    };

    // Formata o valor para moeda brasileira
    const formatarValor = (valor: number) =>
        valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });

    // Formata a hora, por exemplo: 8 -> 08:00
    const formatarHora = (hora: number) =>
        `${String(hora).padStart(2, '0')}:00`;

    return (
        <div className="flex flex-col justify-center items-center w-fit bg-white/20 p-4 rounded-4xl backdrop-blur-lg shadow-lg gap-6 m-1">

            <h1 className="text-lg font-semibold">
                Lista de quadras
            </h1>

            <div className="w-full rounded-2xl text-sm overflow-x-auto">

                {erro && (
                    <p className="text-red-600 font-semibold mb-3">
                        {erro}
                    </p>
                )}

                {carregando ? (
                    <p>Carregando quadras...</p>
                ) : quadras.length === 0 ? (
                    <p>Nenhuma quadra cadastrada.</p>
                ) : (
                    <table className="p-1 border-separate border-spacing-1">
                        <thead>
                            <tr className="text-left">
                                <th className="p-1">ID</th>
                                <th className="p-1">Nome</th>
                                <th className="p-1">Abertura</th>
                                <th className="p-1">Fechamento</th>
                                <th className="p-1">Valor</th>
                                <th className="p-1">Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {quadras.map((quadra) => (
                                <tr key={quadra.oid}>
                                    <td className="bg-white/20 px-3 py-2">
                                        {quadra.oid}
                                    </td>

                                    <td className="bg-white/20 p-2">
                                        {quadra.nome}
                                    </td>

                                    <td className="bg-white/20 p-2">
                                        {formatarHora(
                                            quadra.horFuncionamentoInicio
                                        )}
                                    </td>

                                    <td className="bg-white/20 p-2">
                                        {formatarHora(
                                            quadra.horFuncionamentoFim
                                        )}
                                    </td>

                                    <td className="bg-white/20 p-2">
                                        {formatarValor(quadra.vlrQuadra)}
                                    </td>

                                    <td className="bg-white/20 p-2">
                                        <button
                                            type="button"
                                            disabled={excluindoId === quadra.oid}
                                            onClick={() =>
                                                handleDeletarQuadra(quadra.oid)
                                            }
                                            title="Excluir quadra"
                                            className="rounded-full p-1 cursor-pointer bg-white/30 hover:bg-red-200 disabled:opacity-50"
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

export default QuadrasTable;
