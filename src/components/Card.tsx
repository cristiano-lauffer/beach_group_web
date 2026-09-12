import Button from './Button'

//typescript:
type CardProps = {
    imagem: string;
    titulo: string;
    descricao: string;
    valor: string;
    tipo?: string;
};

const Card = ({ imagem, titulo, descricao, valor, tipo = "mes" }: CardProps) => {
    return (
        <div className="m-4 border border-black/30 p-4 rounded-4xl flex flex-col justify-between">
            <div className='flex justify-center pb-2'>
                <img src={imagem} className=' rounded-4xl' alt="Beach tennis training" />
            </div>
            <div className='flex flex-col'>
                <p className='uppercase font-bold pb-2'>{titulo}</p>
                <p className='pb-2 text-sm'>{descricao}</p>
            </div>
            <div className='flex justify-center items-center'>
                <div className='flex flex-col items-end'>
                    <p className='font-bold text-xs'>R${valor}</p>
                <p className='font-bold text-xs'>/{tipo}</p>
                </div>
                <Button title="Contratar" />
            </div>
        </div>
    )
}

export default Card