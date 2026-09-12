import Navbar from './Navbar'
import Button from './Button'

const Header = () => {
    return (
        <div className="bg-(image:--background-img) md:bg-(image:--background-img-md) bg-cover bg-center min-h-125 rounded-b-4xl flex flex-col">
            <Navbar />
            <div className='pl-2 flex flex-1 flex-col justify-center pb-12'>
                <h2 className='text-white p-4 text-5xl md:max-w-100 uppercase font-bold italic'>Supere seus limites na quadra</h2>
                <div className='flex '>
                    <Button title="Cadastre-se" />
                    <Button title="Fale Conosco" bgColor="bg-white/20" hoverColor="hover:bg-white/40"/>
                </div>
            </div>
        </div>
    )
}

export default Header