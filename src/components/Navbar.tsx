import Button from './Button.tsx'
import Logomarca from './Logomarca.tsx'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'; // Ícones sugeridos para o menu
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate();

    return (
        <Disclosure as="nav" className="p-4">
            {({ open }) => (
                <>
                    {/* Container Principal: Grid para Desktop / Flex para Mobile */}
                    <div className="px-2 py-1 grid grid-cols-2 md:grid-cols-6 items-center bg-white/20 rounded-full">

                        {/* 1. Logo (Sempre visível) */}
                        <div className="flex justify-start ">
                            <Logomarca />
                        </div>
                        {/* 2. Botão do Menu Mobile (Visível apenas em telas menores que 'md') */}
                        <div className="flex md:hidden justify-end">
                            <DisclosureButton className="inline-flex items-center justify-center p-2 rounded-full hover:bg-white/20 focus:outline-none">
                                {open ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </DisclosureButton>
                        </div>

                        {/* 3. Links Desktop (Escondidos no mobile: 'hidden md:flex') */}
                        <ul className="text-white hidden md:flex gap-8 items-center justify-center md:col-span-4 cursor-pointer">
                            <li className="hover:text-gray-200 transition">Sobre nós</li>
                            <li className="hover:text-gray-200 transition">Planos</li>
                            <li className="hover:text-gray-200 transition">Agenda</li>
                            <li className="hover:text-gray-200 transition">Contato</li>
                        </ul>

                        {/* 4. Botão Entrar Desktop (Escondido no mobile) */}
                        <div className="hidden md:flex justify-end">
                            <Button onClick={() => navigate('/cadastro')} title="Cadastrar-se"  />
                            <Button title="Entrar" onClick={() => navigate('/login')} bgColor="bg-sky-400" hoverColor="hover:bg-sky-600" />
                        </div>
                    </div>

                    {/* 5. Painel do Menu Mobile (Dropdown que aparece ao clicar) */}
                    <DisclosurePanel className="md:hidden pb-6 px-6 bg-white/20 rounded-4xl">
                        <ul className="text-white flex flex-col gap-4 font-medium border-t border-white/10 pt-4 mt-2">
                            <li className="hover:bg-white/10 p-2 rounded-lg">Sobre nós</li>
                            <li className="hover:bg-white/10 p-2 rounded-lg">Planos</li>
                            <li className="hover:bg-white/10 p-2 rounded-lg">Agenda</li>
                            <li className="hover:bg-white/10 p-2 rounded-lg">Contato</li>
                            <div className="pt-2 text-black/80">
                                <Button onClick={() => navigate('/cadastro')} title="Cadastrar-se" />
                                <Button title="Entrar" onClick={() => navigate('/login')} bgColor="bg-sky-400" hoverColor="hover:bg-sky-600" />
                            </div>
                        </ul>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
};

export default Navbar;