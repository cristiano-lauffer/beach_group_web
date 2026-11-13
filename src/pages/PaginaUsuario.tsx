import React, { useEffect, useState } from 'react';
import Logomarca from '../components/Logomarca';
import { QuadraCadastro } from '../components/userComponents/QuadraCadastro';
import { QuadrasTable } from '../components/userComponents/QuadrasTable';
import ReservaCadastro from '../components/userComponents/ReservaCadastro';
import ReservasTable from '../components/userComponents/ReservasTable';
import UserCadastro from '../components/userComponents/UserCadastro';
import UserCard from '../components/userComponents/UserCard';
import { UsersTable } from '../components/userComponents/UsersTable';

const PaginaUsuario = () => {
  const [usuarioId, setUsuarioId] = useState<number>(0);

  useEffect(() => {
    const usuarioStorage = localStorage.getItem('@BeachGroup:usuario');
    
    if (usuarioStorage) {
      try {
        const usuario = JSON.parse(usuarioStorage);
        if (usuario?.oid) {
          setUsuarioId(usuario.oid);
        }
      } catch (err) {
        console.error('Erro ao ler usuário do localStorage:', err);
      }
    }
  }, []);

  return (
    <div className="bg-(image:--background-img-limpo) min-h-screen bg-cover bg-center flex flex-col items-center justify-between p-4">
      <header className='bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors duration-300'>
        <Logomarca />
      </header>

      <main className='flex flex-wrap'>
        <UserCard /> {/* card com dados do usuario logado */}
        <UsersTable /> {/* tabela com todos os usuarios cadastrados */}
        <QuadrasTable /> {/* tabela com todas as quadras cadastradas */}
        <UserCadastro /> {/* formulario para cadastro de novos usuarios */}
        <QuadraCadastro /> {/* formulario para cadastro de novas quadras */}
        <ReservaCadastro usuarioId={usuarioId} /> {/* formulario para cadastro de novas reservas, passando o ID do usuario logado como prop */}
        <ReservasTable /> {/* tabela com todas as reservas cadastradas */}
      </main>

      <footer>
        <p className="m-2 text-white/60 text-center text-xs">© 2026 BeachGroup</p>
      </footer>
    </div>
  );
};

export default PaginaUsuario;