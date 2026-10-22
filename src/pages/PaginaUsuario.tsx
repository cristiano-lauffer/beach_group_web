import Logomarca from '../components/Logomarca';
import { QuadraCadastro } from '../components/userComponents/QuadraCadastro';
import { QuadrasTable } from '../components/userComponents/QuadrasTable';
import UserCadastro from '../components/userComponents/UserCadastro';
import UserCard from '../components/userComponents/UserCard';
import { UsersTable } from '../components/userComponents/UsersTable';


const PaginaUsuario = () => {
  
  return (
    <div className="bg-(image:--background-img-limpo) min-h-screen bg-cover bg-center flex flex-col items-center justify-between p-4">
      <header className='bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors duration-300'>
        <Logomarca />
      </header>

      <main className='flex flex-wrap'>
        <UserCard />
        <UsersTable />
        <QuadrasTable />
        <UserCadastro />
        <QuadraCadastro />
      </main>

      <footer>
        <p className="m-2 text-white/60 text-center text-xs">© 2026 BeachGroup</p>
      </footer>
    </div>
  );
};

export default PaginaUsuario;