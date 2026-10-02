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

export const UserCard: React.FC = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  // Estados para controlar a edição
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);
  const [nomeEdit, setNomeEdit] = useState('');
  const [emailEdit, setEmailEdit] = useState('');
  const [senhaEdit, setSenhaEdit] = useState('');
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    // Busca os dados salvos no localStorage
    const userStorage = localStorage.getItem('@BeachGroup:user');
    const tokenStorage = localStorage.getItem('@BeachGroup:token');

    if (!userStorage || !tokenStorage) {
      navigate('/login');
      return;
    }

    setUsuario(JSON.parse(userStorage));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('@BeachGroup:token');
    localStorage.removeItem('@BeachGroup:user');
    navigate('/login');
  };

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
      const payload: { nome: string; email: string; senha?: string } = {
        nome: nomeEdit,
        email: emailEdit,
      };

      if (senhaEdit.trim() !== '') {
        payload.senha = senhaEdit;
      }

      await api.put(`/usuarios/${usuarioEditando.id}`, payload);

      const usuarioAtualizado = {
        id: usuarioEditando.id,
        nome: nomeEdit,
        email: emailEdit,
      };

      setUsuario(usuarioAtualizado);
      //Atualiza o localStorage com os novos dados
      localStorage.setItem('@BeachGroup:user', JSON.stringify(usuarioAtualizado));

      setUsuarioEditando(null);
    } catch (err) {
      alert('Erro ao atualizar o usuário.');
    } finally {
      setSalvando(false);
    }
  };


  if (!usuario) {
    return null;
  }

  return (
    <div className="flex flex-col justify-center items-center w-100 bg-white/20 p-8 rounded-4xl backdrop-blur-lg shadow-lg gap-6 m-1">
      <h1 className="text-xl font-semibold">Dados do usuário</h1>

      {/* secao dados */}
      <div className="w-full bg-white/50 p-5 rounded-2xl space-y-3 text-sm">
        <p>
          <strong className="">ID do Usuário:</strong> {usuario.id}
        </p>
        <p>
          <strong className="">Nome:</strong> {usuario.nome}
        </p>
        <p>
          <strong className="">E-mail:</strong> {usuario.email}
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full">
        
        <Button
          title="Editar"
          tamanho="w-full"
          tipo="button"
          onClick={() => handleAbrirEdicao(usuario)}
        />
        <Button
          title="Sair"
          textColor="text-white"
          bgColor="bg-red-500"
          hoverColor="hover:bg-red-800"
          onClick={handleLogout}
          tamanho="w-full"
          tipo="button"
        />
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

export default UserCard;