import Button from '../../components/Button'
import InputItem from '../../components/InputItem'

import React, { useState } from 'react';
import { userService } from '../../services/userService';

export const UserCadastro: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cadastrando, setCadastrando] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErro('');
        setSucesso('');

        setCadastrando(true);
        try {
            await userService.cadastrar({ nome, email, senha });

            setSucesso('Usuário cadastrado com sucesso!');
            
            // Limpa os campos
            setNome('');
            setEmail('');
            setSenha('');

            // Recarrega a página inteira para atualizar os outros componentes (como a tabela)
            setTimeout(() => {
                window.location.reload();
            }, 1000);

        } catch (err: any) {
            if (err.response && err.response.status === 409) {
                setErro('Já existe um utilizador registado com este e-mail.');
            } else {
                setErro('Erro ao ligar ao servidor. Tente novamente mais tarde.');
            }
        } finally {
            setCadastrando(false);
        }
    };

    return (
        <div>
            {/* card Cadastro */}
            <form onSubmit={handleSubmit} className=' flex flex-col justify-center items-center bg-white/20 w-100 rounded-4xl backdrop-blur-sm shadow-lg gap-4 m-1 p-4'>
                <h1 className="text-l font-semibold">Cadastrar usuário</h1>
                <div className='text-sm flex flex-col gap-3'>
                    <InputItem
                        title="Nome completo"
                        tipo="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} 
                    />

                    <InputItem
                        title="Email"
                        tipo="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />

                    <InputItem
                        title="Senha"
                        tipo="password"
                        value={senha} 
                        onChange={(e) => setSenha(e.target.value)} 
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
    )
}

export default UserCadastro;