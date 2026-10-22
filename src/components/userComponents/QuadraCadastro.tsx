import Button from '../../components/Button';
import InputItem from '../../components/InputItem';

import React, { useState } from 'react';
import { quadraService } from '../../services/quadraService';

export const QuadraCadastro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [horFuncionamentoInicio, setHorFuncionamentoInicio] = useState('');
    const [horFuncionamentoFim, setHorFuncionamentoFim] = useState('');
    const [vlrQuadra, setVlrQuadra] = useState('');
    
    const [cadastrando, setCadastrando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErro('');
        setSucesso('');

        setCadastrando(true);
        try {
            await quadraService.cadastrar({
                nome,
                horFuncionamentoInicio: Number(horFuncionamentoInicio),
                horFuncionamentoFim: Number(horFuncionamentoFim),
                vlrQuadra: Number(vlrQuadra),
            });

            setSucesso('Quadra cadastrada com sucesso!');
            
            // Limpa os campos
            setNome('');
            setHorFuncionamentoInicio('');
            setHorFuncionamentoFim('');
            setVlrQuadra('');

            // Recarrega a página após 1 segundo para atualizar a tabela/listagem de quadras
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setErro('Já existe uma quadra registada com este nome.');
            } else {
                setErro('Erro ao ligar ao servidor. Tente novamente mais tarde.');
            }
        } finally {
            setCadastrando(false);
        }
    };

    return (
        <div>
            {/* Card de Cadastro de Quadra */}
            <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center bg-white/20 w-100 rounded-4xl backdrop-blur-sm shadow-lg gap-4 m-1 p-4'>
                <h1 className="text-l font-semibold">Cadastrar quadra</h1>
                <div className='text-sm flex flex-col gap-3'>
                    <InputItem
                        title="Nome da Quadra"
                        tipo="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} 
                    />

                    <InputItem
                        title="Início do Funcionamento (Hora)"
                        tipo="number"
                        value={horFuncionamentoInicio}
                        onChange={(e) => setHorFuncionamentoInicio(e.target.value)} 
                    />

                    <InputItem
                        title="Fim do Funcionamento (Hora)"
                        tipo="number"
                        value={horFuncionamentoFim}
                        onChange={(e) => setHorFuncionamentoFim(e.target.value)} 
                    />

                    <InputItem
                        title="Valor da Quadra (R$)"
                        tipo="number"
                        value={vlrQuadra}
                        onChange={(e) => setVlrQuadra(e.target.value)} 
                    />

                    <Button 
                        title={cadastrando ? "Cadastrando..." : "Cadastrar"} 
                        tamanho="w-[265px] md:w-[245px]" 
                        tipo='submit' 
                    />
                </div>
            </form>
            {erro && <p style={{ color: 'red' }} className="mt-2 text-sm text-center">{erro}</p>}
            {sucesso && <p style={{ color: 'green' }} className="mt-2 text-sm text-center">{sucesso}</p>}
        </div>
    );
};

export default QuadraCadastro;