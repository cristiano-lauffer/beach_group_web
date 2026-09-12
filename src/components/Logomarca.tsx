import Logo from '../assets/Logo.png'
import { useNavigate } from 'react-router-dom';

const Logomarca = () => {

    const navigate = useNavigate();

    return (
        <div >
            <button onClick={() => navigate('/')} className='cursor-pointer flex gap-2 items-center p-4'><img className='h-6' src={Logo} alt="Logo BeachGroup" />
                <p className='text-white font-bold tracking-wide uppercase italic'>BeachGroup</p></button>
        </div>
    )
}


export default Logomarca