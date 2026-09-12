import imagem from '../assets/foto4.jpg';

const SecaoTexto = () => {
    return (
        <div className="bg-lime-400 mb-4 rounded-4xl p-4 mt-6 mx-6 grid md:grid-cols-2 items-center">
            <div className="p-4">
                <h2 className='uppercase text-xl text-justify font-bold italic'>Nós oferecemos treinamento de beach tennis excepcional e um ambiente acolhedor para jogadores de todas
                    as idades e níveis de habilidade.</h2>
                <p className='pt-4 text-justify text-sm'>Seja você um iniciante que está dando os primeiros passos no esporte ou um jogador experiente em busca de evolução, nossos programas são desenvolvidos para atender diferentes níveis e objetivos. Com treinos personalizados e uma abordagem focada no seu desenvolvimento, você poderá aprimorar sua técnica, melhorar seu condicionamento físico, desenvolver estratégias de jogo e ganhar mais confiança dentro da quadra. Tudo isso em um ambiente motivador, com acompanhamento e orientação para que você evolua de forma consistente e alcance seus objetivos no beach tennis.
</p>
            </div>
            <div className='flex justify-center'>
                <img src={imagem} className='md:max-h-100 rounded-4xl' alt="Beach tennis training" />
            </div>
        </div>

    )
}

export default SecaoTexto