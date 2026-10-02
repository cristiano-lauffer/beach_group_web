import React, { useState } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';

import Button from '../components/Button'
import InputItem from '../components/InputItem'
import Logomarca from '../components/Logomarca'


export const Login: React.FC = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');


    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setErro('');

        try {
            const data = await authService.login({ email, senha });

            // Guardar Token e dados do utilizador no localStorage
            localStorage.setItem('@BeachGroup:token', data.token);
            localStorage.setItem('@BeachGroup:user', JSON.stringify({ id: data.id, nome: data.nome, email: data.email }));

            // redireciona para a pagina do usuario
            navigate('/usuario');
        } catch (err: any) {
            if (err.response && err.response.status === 401) {
                setErro('E-mail ou senha inválidos.');
            } else {
                setErro('Erro ao conectar com o servidor.');
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
                {/* card login */}
                <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center bg-white/20 h-[60%] w-[85%]  md:w-125  rounded-4xl backdrop-blur-sm shadow-lg gap-4'>
                    <h1 className='font-medium text-lg'>Bem-vindo(a) de volta!</h1>
                    <div className='text-sm'>

                        <InputItem
                            title="Email"
                            tipo="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />

                        <InputItem
                            title="Senha"
                            tipo="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)} />

                        <div className='flex justify-between items-center gap-2 text-xs p-2'>
                            <div className='flex items-center'>
                                <input type="checkbox" className='checked:bg-sky-600 mr-0.5' /> Lembrar-me
                            </div>
                            <a href="#" className=" hover:underline ">
                                Esqueci minha senha
                            </a>
                        </div>

                        <Button tipo="submit" title="Entrar" tamanho="w-[265px] md:w-[245px]" />

                        {erro && <p style={{ color: 'red' }}>{erro}</p>}

                        <Button onClick={() => navigate('/cadastro')} title="Cadastrar-se" bgColor="bg-sky-400" hoverColor="hover:bg-sky-600" tamanho="w-[265px] md:w-[245px]" />
                    </div>
                </form>

                <div>
                    <p className="m-2 mt-8 text-white/60 text-center text-xs">© 2026 BeachGroup</p>
                </div>
            </div>
        </div>
    )
}

export default Login