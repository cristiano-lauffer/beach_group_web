import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';

type CarouselImagensProps = {
  slides: Array<string>;
};

const CarouselImagens = ({ slides }: CarouselImagensProps) => {
  const [current, setCurrent] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detecta se a tela é desktop (>= 768px)
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 768);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Ajusta a largura e o deslocamento dependendo do dispositivo
  const itemWidth = isDesktop ? 33.33 : 70;
  const offset = isDesktop ? 33.33 : 15;

  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Botões */}
      <button 
        onClick={previousSlide} 
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-lime-400 hover:bg-lime-500 text-gray-900 shadow-lg cursor-pointer transition"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      <button 
        onClick={nextSlide} 
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-lime-400 hover:bg-lime-500 text-gray-900 shadow-lg cursor-pointer transition"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </button>

      {/* Container de Imagens com cálculo dinâmico */}
      <div 
        className="flex transition-transform duration-500 ease-out"
        style={{
          transform: `translateX(calc(-${current * itemWidth}% + ${offset}%))`,
        }}
      >
        {slides.map((slide, index) => {
          const isActive = index === current;

          return (
            <div
              key={index}
              className={`shrink-0 w-[70%] md:w-1/3 px-2 transition-all duration-500 ease-out ${
                isActive 
                  ? 'scale-100 opacity-100 z-10' 
                  : 'scale-90 opacity-40 blur-[1px]'
              }`}
            >
              <img
                src={slide}
                alt={`Imagem ${index + 1}`}
                className="w-full h-[350px] md:h-[420px] object-cover rounded-3xl shadow-xl"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarouselImagens;