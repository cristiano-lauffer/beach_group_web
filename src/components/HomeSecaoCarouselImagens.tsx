import CarouselImagens from './CarouselImagens.tsx'
import imagem0 from '../assets/slide-img-0.jpg';
import imagem1 from '../assets/slide-img-1.jpg';
import imagem2 from '../assets/slide-img-2.jpg';
import imagem3 from '../assets/slide-img-3.jpg';
import imagem4 from '../assets/slide-img-4.jpg';
import imagem5 from '../assets/slide-img-5.jpg';

let slides = [imagem0, imagem1, imagem2, imagem3, imagem4, imagem5];

const SecaoCarouselImagens = () => {
  return (
    <div className='py-2'>
      <h2 className='uppercase text-2xl font-bold italic mt-1 mb-2 pl-8 pr-15 text-lime-300 bg-sky-500 inline-block [clip-path:polygon(0%_0%,100%_0%,90%_100%,0%_100%)]'>Galeria de fotos</h2>
        <div className="">
        <CarouselImagens slides={slides} />
      </div>
    </div>
    )
}

export default SecaoCarouselImagens