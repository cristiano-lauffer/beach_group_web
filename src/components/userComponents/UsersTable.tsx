import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { userService } from '../../services/userService';

import { PencilSquareIcon, TrashIcon, DocumentCheckIcon, XCircleIcon } from '@heroicons/react/24/outline';

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
                senha: senhaEdit
            }
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

    const handleDeletarUsuario = async (id: number) => {
        const confirmar = window.confirm(
            'Tem certeza que deseja excluir este usuário?'
        );

        if (!confirmar) return;

        try {
            await userService.deletar(id);

            // Remove o usuário da lista exibida
            setUsuarios((prev) =>
                prev.filter((usuario) => usuario.id !== id)
            );
        } catch (err) {
            alert('Erro ao excluir o usuário.');
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-fit bg-white/20 p-4 rounded-4xl backdrop-blur-lg shadow-lg gap-6 m-1">
            {!usuarioEditando && (
                <h1 className="text-l font-semibold">Lista de usuários</h1>
            )}

            {/* secao dados */}
            <div className="w-full rounded-2xl text-sm max-h-100 ">
                {erro && <p className="text-red-500 font-semibold">{erro}</p>}
                {!usuarioEditando && (
                    <table className="p-1 border-separate border-spacing-1">
                        <thead>
                            <tr className="text-left">
                                <th className="">ID</th>
                                <th className="">Nome</th>
                                <th className="">E-mail</th>
                                <th className="">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario) => (
                                <tr key={usuario.id}>
                                    <td className="bg-white/20 px-3">{usuario.id}</td>
                                    <td className="bg-white/20 p-1">{usuario.nome}</td>
                                    <td className="bg-white/20 p-1">{usuario.email}</td>
                                    <td className="bg-white/20 p-1">
                                        <div className='flex'>
                                            <button type="button" className='rounded-full p-0.75 cursor-pointer bg-white/30 hover:bg-green-200 pl-1'
                                                onClick={() => handleAbrirEdicao(usuario)}
                                            >
                                                <PencilSquareIcon className="block h-5 w-5" aria-hidden="true" />
                                            </button>
                                            <button type="button"
                                                onClick={() => handleDeletarUsuario(usuario.id)}
                                                title="Excluir usuário" className='rounded-full p-0.75 cursor-pointer bg-white/30 hover:bg-red-200 ml-1'>
                                                <TrashIcon className="block h-5 w-5" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

            </div>
            {/* MODAL DE EDIÇÃO */}
            {usuarioEditando && (
                <div className=" p-6 rounded-2xl w-90 max-w-md flex flex-col gap-4 text-gray-800">
                    <h2 className="text-l font-bold">Editar: {usuarioEditando.nome} </h2>
                    <p className="text-l font-bold">ID: {usuarioEditando.id}</p>

                    <form onSubmit={handleSalvarEdicao} className="flex flex-col gap-3">
                        <InputItem
                            title="Nome"
                            tipo="text"
                            bgColor="bg-sky-100/80"
                            tamanho='text-sm w-full'
                            value={nomeEdit}
                            onChange={(e) => setNomeEdit(e.target.value)}
                        />

                        <InputItem
                            title="E-mail"
                            tipo="email"
                            bgColor="bg-sky-100/80"
                            tamanho='text-sm w-full'
                            value={emailEdit}
                            onChange={(e) => setEmailEdit(e.target.value)}
                        />

                        <InputItem
                            title="Senha"
                            tipo="password"
                            bgColor="bg-sky-100/80"
                            tamanho='text-sm w-full'
                            value={senhaEdit}
                            onChange={(e) => setSenhaEdit(e.target.value)}
                        />

                        <div className="flex gap-2 mt-4">

                            <button type='submit' className='rounded-full flex p-0.75 cursor-pointer bg-white/30 hover:bg-white/50 pl-1'>
                                <DocumentCheckIcon className="block h-5 w-5" aria-hidden="true" /> <p className="text-xs py-0.5 px-1">{salvando ? "Salvando..." : "Salvar"}</p>
                            </button>
                            <button type='button' onClick={() => setUsuarioEditando(null)} className='rounded-full flex p-0.75 cursor-pointer bg-white/30 hover:bg-white/50 pl-1'>
                                <XCircleIcon className="block h-5 w-5" aria-hidden="true" /> <p className="text-xs py-0.5 px-1">Cancelar</p>
                            </button>

                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};
export default UsersTable;