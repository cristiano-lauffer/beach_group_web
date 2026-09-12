import Button from '../components/Button'
import InputItem from '../components/InputItem'
import Logomarca from '../components/Logomarca'

import { useNavigate } from 'react-router-dom';

const Cadastro = () => {

    const navigate = useNavigate();

    return (
        <div>
            {/* fundo imagem */}
            <div className="bg-(image:--background-img) h-screen md:bg-(image:--background-img-md) bg-cover bg-center flex flex-col items-center justify-between">
                <Logomarca />
                {/* card Cadastro */}
                <form className=' flex flex-col justify-center items-center bg-white/20 h-[65%] md:h-[75%] w-[85%]  md:w-125  rounded-4xl backdrop-blur-sm shadow-lg gap-4'>
                    <h1 className='font-medium text-lg'>Junte-se à nossa comunidade!</h1>
                    <div className='text-sm'>
                        <InputItem title="Nome" />
                        <InputItem title="Email" />
                        <InputItem title="Senha" />
                        <InputItem title="Confirme sua senha" />
                            <Button title="Cadastrar" tamanho="w-[265px] md:w-[245px]" />
                        <div className='pt-4'>
                            <p className='text-sm'>Já possui uma conta?</p>
                            <Button onClick={() => navigate('/login')} title="Entrar" bgColor="bg-sky-400" hoverColor="hover:bg-sky-600" tamanho="w-[265px] md:w-[245px]" />
                        </div>
                    </div>
                </form>
                
                <div>
                    <p className="m-2 mt-8 text-white/60 text-center text-xs">© 2026 BeachGroup</p>
                </div>
            </div>
        </div>
    )
}

export default Cadastro