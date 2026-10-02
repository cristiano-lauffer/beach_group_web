import Logomarca from '../components/Logomarca';
import UserCard from '../components/userComponents/UserCard';
import { UsersTable } from '../components/userComponents/UsersTable';


const PaginaUsuario = () => {
  
  return (
    <div className="bg-(image:--background-img) min-h-screen md:bg-(image:--background-img-md) bg-cover bg-center flex flex-col items-center justify-between p-4">
      <header className='bg-white/20 p-1 rounded-full hover:bg-white/30 transition-colors duration-300'>
        <Logomarca />
      </header>

      <main className='flex'>
        <UserCard />
        <UsersTable />
      </main>

      <footer>
        <p className="m-2 text-white/60 text-center text-xs">© 2026 BeachGroup</p>
      </footer>
    </div>
  );
};

export default PaginaUsuario;