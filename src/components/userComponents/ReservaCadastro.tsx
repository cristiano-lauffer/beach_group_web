import React, { useState, useEffect } from 'react';
import { reservaService, type CriarReservaRequest, type Reserva } from '../../services/reservaService';
import { quadraService, type Quadra } from '../../services/quadraService';
import Button from '../../components/Button';
import InputItem from '../../components/InputItem';

type ReservaCadastroProps = {
    usuarioId?: number;
    onReservaCriada?: () => void;
};

const ReservaCadastro = ({ usuarioId = 0, onReservaCriada }: ReservaCadastroProps) => {
    const [quadras, setQuadras] = useState<Quadra[]>([]);
    const [quadraId, setQuadraId] = useState<number>(0);
    const [data, setData] = useState<string>(new Date().toISOString().split('T')[0]);
    const [horarioSelecionado, setHorarioSelecionado] = useState<number | null>(null);
    const [horariosOcupados, setHorariosOcupados] = useState<number[]>([]);
    const [valorQuadra, setValorQuadra] = useState<number>(0);

    const [cadastrando, setCadastrando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    // Horários das 6h às 23h
    const slotsHorarios = Array.from({ length: 18 }, (_, i) => i + 6);

    // Função inteligente que varre o localStorage para encontrar o ID do usuário
    const obterIdUsuarioReal = (): number => {
        if (usuarioId && usuarioId !== 0) return usuarioId;

        console.log("--- INSPECIONANDO LOCALSTORAGE PARA ACHAR O ID ---");
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key!);
            console.log(`Chave: ${key} | Valor: ${value}`);
        }
        console.log("-------------------------------------------------");

        // 1. Tenta chaves comuns conhecidas
        const chavesParaTestar = ['usuarioId', 'idUsuario', 'user_id', 'id', '@BeachGroup:usuario', '@BeachGroup:user'];
        for (const chave of chavesParaTestar) {
            const val = localStorage.getItem(chave);
            if (val) {
                if (!val.startsWith('{')) {
                    const num = Number(val);
                    if (!isNaN(num) && num > 0) return num;
                } else {
                    try {
                        const obj = JSON.parse(val);
                        const idEncontrado = obj?.oid || obj?.oidUsuario || obj?.id || obj?.usuarioId;
                        if (idEncontrado) return Number(idEncontrado);
                    } catch {}
                }
            }
        }

        // 2. Varre todos os objetos JSON salvos no localStorage à procura de um ID
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const val = localStorage.getItem(key!);
            if (val && val.startsWith('{')) {
                try {
                    const obj = JSON.parse(val);
                    const idEncontrado = obj?.oid || obj?.oidUsuario || obj?.id || obj?.usuarioId;
                    if (idEncontrado && !isNaN(Number(idEncontrado))) {
                        return Number(idEncontrado);
                    }
                } catch {}
            }
        }

        return 0;
    };

    // Carrega quadras
    useEffect(() => {
        const carregarQuadras = async () => {
            try {
                const lista = await quadraService.listar();
                setQuadras(lista);
                if (lista.length > 0) {
                    setQuadraId(lista[0].oid);
                    setValorQuadra(lista[0].vlrQuadra);
                }
            } catch (err) {
                console.error('Erro ao buscar quadras:', err);
            }
        };
        carregarQuadras();
    }, []);

    // Atualiza valor ao trocar quadra
    const handleQuadraChange = (id: number) => {
        setQuadraId(id);
        const q = quadras.find(item => item.oid === id);
        if (q) setValorQuadra(q.vlrQuadra);
    };

    // Carrega horários ocupados
    useEffect(() => {
        const carregarHorariosOcupados = async () => {
            if (!quadraId || !data) return;
            try {
                const reservas: Reserva[] = await reservaService.listar();
                const ocupados = reservas
                    .filter(r => r.oidQuadra === quadraId && r.datReserva.startsWith(data))
                    .map(r => r.horInicio);

                setHorariosOcupados(ocupados);
            } catch (err) {
                console.error('Erro ao verificar horários ocupados:', err);
            }
        };

        carregarHorariosOcupados();
        setHorarioSelecionado(null);
    }, [data, quadraId]);

    // Submete a reserva
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErro('');
        setSucesso('');

        if (horarioSelecionado === null) {
            setErro('Selecione um horário disponível.');
            return;
        }

        const idReal = obterIdUsuarioReal();

        if (!idReal || idReal === 0) {
            setErro('Erro: ID do usuário não identificado. Faça login novamente.');
            return;
        }

        const payload: CriarReservaRequest = {
            oidUsuario: idReal,
            oidQuadra: quadraId,
            datReserva: data,
            horInicio: horarioSelecionado,
            vlrReserva: valorQuadra
        };

        setCadastrando(true);
        console.log("Payload enviado:", payload);

        try {
            await reservaService.criar(payload);
            setSucesso('Reserva realizada com sucesso!');
            setHorariosOcupados(prev => [...prev, horarioSelecionado]);
            setHorarioSelecionado(null);

            if (onReservaCriada) {
                onReservaCriada();
            }
        } catch (err: any) {
            const erroMsg = err?.response?.data || 'Erro ao realizar a reserva.';
            setErro(typeof erroMsg === 'string' ? erroMsg : 'Erro ao realizar a reserva.');
        } finally {
            setCadastrando(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center bg-white/20 w-100 rounded-4xl backdrop-blur-sm shadow-lg gap-4 m-1 p-4">
                <h1 className="text-l font-semibold">Reservar Quadra</h1>

                <div className="text-sm flex flex-col gap-3 w-full">
                    {/* Seleção de Quadra */}
                    <div className="flex flex-col gap-1">
                        <label className="">Quadra</label>
                        <select
                            value={quadraId}
                            onChange={e => handleQuadraChange(Number(e.target.value))}
                            className="w-full p-1 bg-white/50 border border-black/10 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            {quadras.map(q => (
                                <option key={q.oid} value={q.oid}>
                                    {q.nome} - R$ {q.vlrQuadra.toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Seleção de Data */}
                    <InputItem
                        title="Data da Reserva"
                        tipo="date"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />

                    {/* Seletor Visual de Horários */}
                    <div className="flex flex-col gap-1">
                        <label className="">Horários Disponíveis (6h às 23h)</label>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {slotsHorarios.map(hora => {
                                const isOcupado = horariosOcupados.includes(hora);
                                const isSelecionado = horarioSelecionado === hora;

                                return (
                                    <button
                                        key={hora}
                                        type="button"
                                        disabled={isOcupado}
                                        onClick={() => setHorarioSelecionado(hora)}
                                        className={`py-2 rounded-xl text-xs font-bold transition-all ${
                                            isOcupado
                                                ? 'bg-gray-100/50 text-gray-400 cursor-not-allowed line-through'
                                                : isSelecionado
                                                ? 'bg-lime-400 text-gray-950 ring-2 ring-lime-600 scale-105'
                                                : 'bg-white/40 text-gray-700 border hover:bg-cyan-200 cursor-pointer'
                                        }`}
                                    >
                                        {hora}:00
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="flex justify-center mt-2">
                        <Button
                            title={cadastrando ? "Reservando..." : `Confirmar Reserva ${horarioSelecionado !== null ? `(${horarioSelecionado}:00h)` : ''}`}
                            tamanho="w-[265px] md:w-[245px]"
                            tipo="submit"
                        />
                    </div>
                </div>
            </form>

            {erro && <p style={{ color: 'red' }} className="mt-2 text-sm text-center font-bold">{erro}</p>}
            {sucesso && <p style={{ color: 'green' }} className="mt-2 text-sm text-center font-bold">{sucesso}</p>}
        </div>
    );
};

export default ReservaCadastro;