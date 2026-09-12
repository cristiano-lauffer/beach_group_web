import Logomarca from './Logomarca.tsx'

import icone1 from '../assets/icon-instagram.svg'
import icone2 from '../assets/icon-spotify.svg'
import icone3 from '../assets/icon-youtube.svg'
import icone4 from '../assets/icon-strava.svg'

import {ChevronRightIcon} from '@heroicons/react/24/outline';
import { MapPinIcon, ClockIcon, DevicePhoneMobileIcon } from '@heroicons/react/20/solid'

const Footer = () => {
    return (
        <div className='bg-gray-950 rounded-t-4xl'>
        <div className="justify-center items-center grid md:grid-cols-4 p-6 text-white divide-y md:divide-y-0 md:divide-x divide-white/30 gap-4 mt-6">
            <div className='p-4 pb-6 flex flex-col justify-center items-center'>
                <Logomarca />
                <ul className='flex cursor-pointer gap-3'>
                    <li className='flex h-7 w-7 items-center justify-center rounded-full bg-sky-400 p-1.5 transition-colors duration-200 hover:bg-sky-600'>
                        <img className='h-full w-full object-contain' src={icone1} alt="icone instagram" />
                    </li>
                    <li className='flex h-7 w-7 items-center justify-center rounded-full bg-sky-400 p-1.5 transition-colors duration-200 hover:bg-sky-600'>
                        <img className='h-full w-full object-contain' src={icone2} alt="icone spotify" />
                    </li>
                    <li className='flex h-7 w-7 items-center justify-center rounded-full bg-sky-400 p-1.5 transition-colors duration-200 hover:bg-sky-600'>
                        <img className='h-full w-full object-contain' src={icone3} alt="icone youtube" />
                    </li>
                    <li className='flex h-7 w-7 items-center justify-center rounded-full bg-sky-400 p-1.5 transition-colors duration-200 hover:bg-sky-600'>
                        <img className='h-full w-full object-contain' src={icone4} alt="icone strava" />
                    </li>
                </ul>
            </div>
            <div className=' text-xs flex flex-col justify-center p-4 pb-6'>
                <p className='uppercase font-bold mb-4'>Fale conosco:</p>
                <div className='flex'>
                    <input className='bg-white/20 p-2 rounded-l-full w-full max-w-75' type="text" placeholder='beachgroup@email.com' />
                    <button className='rounded-r-full bg-lime-400 hover:bg-lime-500 cursor-pointer text-black font-bold px-1.5 h-8'>
                        <ChevronRightIcon className="block h-5 w-5" aria-hidden="true" />
                    </button>
                    </div>
            </div>
            <div className='text-xs p-4'>
                <h3 className='uppercase font-bold pb-2'>Menu</h3>
                <ul className="text-white cursor-pointer pl-12">
                    <li className="hover:text-lime-400 transition pb-2">Sobre nós</li>
                    <li className="hover:text-lime-400 transition pb-2">Planos</li>
                    <li className="hover:text-lime-400 transition pb-2">Agenda</li>
                </ul>
            </div>
            <div className='text-xs p-4'>
                <h3 className='uppercase pb-2 font-bold'>Contatos</h3>
                <ul className='ml-2'>
                    <li className='pb-2 flex items-center'> <MapPinIcon className="block h-6 w-6 text-sky-500 pr-2" aria-hidden="true" /> Rua das Hortencias 55 - POA/RS</li>
                    <li className='pb-2 flex items-center'> <ClockIcon className="block h-6 w-6 text-sky-500 pr-2" aria-hidden="true" /> 06h - 23h</li>
                    <li  className='pb-2 flex items-center'> <DevicePhoneMobileIcon className="block h-6 w-6 text-sky-500 pr-2" aria-hidden="true" /> +55 51 98765-4321</li>
                </ul>
                            
            </div>
        </div>
        <div className='text-center text-xs text-white/30 border-t border-t-white/30 py-4'>
            <p>© 2026 BeachGroup</p>
        </div>
        </div>
    )
}

export default Footer


