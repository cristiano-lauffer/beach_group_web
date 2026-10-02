import Button from '../components/Button'
import InputItem from '../components/InputItem'
import Logomarca from '../components/Logomarca'

import React, { useState } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export const Cadastro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErro('');
        setSucesso('');


        if (senha !== confirmarSenha) {
            setErro('As senhas não coincidem.');
            return;
        }

        try {
            await authService.cadastrar({ nome, email, senha });

            setSucesso('Conta criada com sucesso! Redirecionando...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setErro('Já existe um utilizador registado com este e-mail.');
            } else {
                setErro('Erro ao ligar ao servidor. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <div>
            {/* fundo imagem */}
            <div className="bg-(image:--background-img) h-screen md:bg-(image:--background-img-md) bg-cover bg-center flex flex-col items-center justify-between p-4">
                <div className='bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors duration-300'>
                    <Logomarca />
                </div>
                {/* card Cadastro */}
                <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center bg-white/20 h-[65%] md:h-[75%] w-[85%]  md:w-125  rounded-4xl backdrop-blur-sm shadow-lg gap-4'>
                    <h1 className='font-medium text-lg'>Junte-se à nossa comunidade!</h1>
                    <div className='text-sm'>
                        <InputItem
                            title="Nome completo"
                            tipo="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)} />

                        <InputItem
                            title="Email"
                            tipo="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <InputItem
                            title="Senha"
                            tipo="password"
                            value={senha} onChange={(e) => setSenha(e.target.value)} />

                        <InputItem
                            title="Confirme sua senha"
                            tipo="password"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)} />

                        <Button title="Cadastrar" tamanho="w-[265px] md:w-[245px]" tipo='submit' />
                        <div className='pt-4'>
                            <p className='text-sm'>Já possui uma conta?</p>
                            <Button onClick={() => navigate('/login')} title="Entrar" bgColor="bg-sky-400" hoverColor="hover:bg-sky-600" tamanho="w-[265px] md:w-[245px]" />
                        </div>
                    </div>
                </form>
                {erro && <p style={{ color: 'red' }}>{erro}</p>}
                {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}
                <div>
                    <p className="m-2 mt-8 text-white/60 text-center text-xs">© 2026 BeachGroup</p>
                </div>
            </div>
        </div>
    )
}

export default Cadastro