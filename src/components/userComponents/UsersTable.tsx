import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

import Button from '../Button';
import InputItem from '../InputItem';

interface Usuario {
    id: number;
    nome: string;
    email: string;
}

export const UsersTable: React.FC = () => {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [erro, setErro] = useState('');

    // Estados para controlar a edição
    const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
    const [nomeEdit, setNomeEdit] = useState('');
    const [emailEdit, setEmailEdit] = useState('');
    const [senhaEdit, setSenhaEdit] = useState('');
    const [salvando, setSalvando] = useState(false);

    useEffect(() => {
        const tokenStorage = localStorage.getItem('@BeachGroup:token');
        if (!tokenStorage) {
            navigate('/login');
            return;
        }

        // Busca a lista completa de usuarios na API
        const buscarUsuarios = async () => {
            try {
                const response = await api.get<Usuario[]>('/usuarios');
                setUsuarios(response.data);
            } catch (err) {
                setErro('Erro ao carregar a lista de usuários.');
            }
        };

        buscarUsuarios();
    }, [navigate]);
    // Função para abrir o modal preenchido com os dados do utilizador
    const handleAbrirEdicao = (u: Usuario) => {
        setUsuarioEditando(u);
        setNomeEdit(u.nome);
        setEmailEdit(u.email);
        setSenhaEdit(''); 
    };

    // Função para salvar a alteração
    const handleSalvarEdicao = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!usuarioEditando) return;

        setSalvando(true);
        try {
            await api.put(`/usuarios/${usuarioEditando.id}`, {
                nome: nomeEdit,
                email: emailEdit,
                senha: senhaEdit }
            );

            // Atualiza a lista na tela sem precisar recarregar a página
            setUsuarios((prev) =>
                prev.map((item) =>
                    item.id === usuarioEditando.id
                        ? { ...item, nome: nomeEdit, email: emailEdit }
                        : item
                )
            );

            setUsuarioEditando(null); // Fecha o modal
        } catch (err) {
            alert('Erro ao atualizar o usuário.');
        } finally {
            setSalvando(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-fit bg-white/20 p-8 rounded-4xl backdrop-blur-lg shadow-lg gap-6 m-1">
            <h1 className="text-xl font-semibold">Lista de usuários</h1>

            {/* secao dados */}
            <div className="w-full bg-white/50 p-5 rounded-2xl space-y-3 text-sm max-h-100 overflow-y-auto">
                {erro && <p className="text-red-500 font-semibold">{erro}</p>}

                <table className="border-collapse border border-gray-500 p-1 ">
                    <thead>
                        <tr className="bg-gray-400/50">
                            <th className="border border-gray-500 p-2">ID</th>
                            <th className="border border-gray-500 p-2">Nome</th>
                            <th className="border border-gray-500 p-2">E-mail</th>
                            <th className="border border-gray-500 p-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id}>
                                <td className="border border-gray-500 p-1 px-6">{usuario.id}</td>
                                <td className="border border-gray-500 p-1">{usuario.nome}</td>
                                <td className="border border-gray-500 p-1">{usuario.email}</td>
                                <td className="border border-gray-500 p-1">
                                    <div className='flex'>
                                        <Button
                                            title="Editar"
                                            tamanho="w-full"
                                            tipo="button"
                                            onClick={() => handleAbrirEdicao(usuario)}
                                        />
                                        <Button
                                            title="Excluir"
                                            textColor="text-white"
                                            bgColor="bg-red-500"
                                            hoverColor="hover:bg-red-800"
                                            tamanho="w-full"
                                            tipo="button"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            {/* MODAL DE EDIÇÃO */}
            {usuarioEditando && (
                <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center w-full bg-sky-500 p-5 rounded-2xl  z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-md flex flex-col gap-4 text-gray-800">
                        <h2 className="text-lg font-bold">Editar: {usuarioEditando.nome} - ID: {usuarioEditando.id}</h2>

                        <form onSubmit={handleSalvarEdicao} className="flex flex-col gap-3">
                            <InputItem
                                title="Nome"
                                tipo="text"
                                bgColor="bg-sky-100/80"
                                tamanho='w-full'
                                value={nomeEdit}
                                onChange={(e) => setNomeEdit(e.target.value)}
                            />

                            <InputItem
                                title="E-mail"
                                tipo="email"
                                bgColor="bg-sky-100/80"
                                tamanho='w-full'
                                value={emailEdit}
                                onChange={(e) => setEmailEdit(e.target.value)}
                            />

                            <InputItem
                                title="Senha"
                                tipo="password"
                                bgColor="bg-sky-100/80"
                                tamanho='w-full'
                                value={senhaEdit}
                                onChange={(e) => setSenhaEdit(e.target.value)}
                            />

                            <div className="flex gap-2 mt-4">
                                <Button
                                    title={"Salvar"}
                                    tamanho="w-full"
                                    tipo="submit"
                                />
                                <Button
                                    title="Cancelar"
                                    bgColor="bg-gray-400"
                                    hoverColor="hover:bg-gray-500"
                                    tamanho="w-full"
                                    tipo="button"
                                    onClick={() => setUsuarioEditando(null)}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
export default UsersTable;