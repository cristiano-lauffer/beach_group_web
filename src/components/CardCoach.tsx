import Button from './Button.tsx'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; // Ícones sugeridos para o menu

//typescript:
type CardCoachProps = {
  imagem: string;
  nome: string;
  funcao: string;
  descricao: string;
};

const CardCoach = ({ imagem, nome, funcao, descricao }: CardCoachProps) => {
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
            <div className="mb-6 mx-2 border border-black/30 p-2 rounded-4xl flex items-center justify-between w-85.5 lg:w-75 xl:w-85.5">
              <div className='flex justify-center'>
                <img src={imagem} className='max-h-20 rounded-t-full rounded-l-full' alt="Beach tennis training" />
              </div>
              <div className='flex flex-col px-2'>
                <p className='uppercase font-bold pb-2'>{nome}</p>
                <p className='pb-2 text-sm'>{funcao}</p>
              </div>
              <div>
                <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-full bg-lime-400 hover:bg-lime-500 cursor-pointer focus:outline-none">
                  {open ? (
                    <ChevronUpIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <ChevronDownIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
          </div>

          <DisclosurePanel className="w-85.5 lg:w-75 xl:w-85.5 px-4 pb-6 mx-2 text-justify rounded-2xl">

            <div className="text-black/80">
              <p>{descricao}</p>
              <div className='flex justify-end'>
                <Button title="Agendar"/>
              </div>
            </div>

          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default CardCoach