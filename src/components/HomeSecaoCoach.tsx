import CardCoach from './CardCoach'

import imagem0 from '../assets/coach1.jpg';
import imagem1 from '../assets/coach2.jpg';
import imagem2 from '../assets/coach3.jpg';
import imagem3 from '../assets/coach4.jpg';

const SecaoCoach = () => {
    return (
        <div>
            <h2 className='uppercase text-2xl font-bold italic mt-6 mb-4 pl-8 pr-15 text-lime-300 bg-sky-500 inline-block [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)]'>Nosso time</h2>
            <div className='grid md:grid-cols-2  lg:grid-cols-4 items-stretch justify-items-center h-full'>
            <CardCoach imagem={imagem0}
                nome='Igor silva'
                funcao='Instrutor infantil'
                descricao='Professor dinâmico e paciente, especializado em atividades para crianças, com foco no desenvolvimento da coordenação, diversão e aprendizado do beach tennis.'
             />

            <CardCoach imagem={imagem3}
                nome='Marina Antonia'
                funcao='Instrutora'
                descricao='Instrutora dedicada e motivadora, com experiência em treinamento de beach tennis, promovendo habilidades técnicas, táticas e espírito esportivo entre os alunos.'
             />

            <CardCoach imagem={imagem2}
                nome='Marcos Rangel'
                funcao='Instrutor'
                descricao='Professor experiente e motivador, focado no aprimoramento técnico, condicionamento físico e evolução dos alunos em quadra.'
            />

            <CardCoach imagem={imagem1}
                nome='Ana Regina'
                funcao='Instrutora Senior'
                descricao='Professora atenciosa e paciente, que adapta os exercícios ao ritmo dos alunos, priorizando segurança, mobilidade e qualidade de vida durante as aulas'
            />
        </div>
        </div>

    )
}

export default SecaoCoach