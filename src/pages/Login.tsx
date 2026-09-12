import Button from '../components/Button'
import InputItem from '../components/InputItem'
import Logomarca from '../components/Logomarca'

import { useNavigate } from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate();

    return (
        <div>
            {/* fundo imagem */}
            <div className="bg-(image:--background-img) h-screen md:bg-(image:--background-img-md) bg-cover bg-center flex flex-col items-center justify-between">
                <Logomarca />
                {/* card login */}
                <form className=' flex flex-col justify-center items-center bg-white/20 h-[60%] w-[85%]  md:w-125  rounded-4xl backdrop-blur-sm shadow-lg gap-4'>
                        <h1 className='font-medium text-lg'>Bem-vindo(a) de volta!</h1>
                    <div className='text-sm'>
                        <InputItem title="Email" />
                        <InputItem title="Senha" />
                        <div className='flex justify-between items-center gap-2 text-xs p-2'>
                            <div className='flex items-center'>
                                <input type="checkbox" className='checked:bg-sky-600 mr-0.5'/> Lembrar-me
                            </div>
                            <a href="#" className=" hover:underline ">
                                Esqueci minha senha
                            </a>
                        </div>
                        <Button title="Entrar" tamanho="w-[265px] md:w-[245px]" />
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