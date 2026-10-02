import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home'
import Login from './pages/Login' 
import Cadastro from './pages/Cadastro' 
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PaginaUsuario from './pages/PaginaUsuario'


createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/usuario" element={<PaginaUsuario />} />
        
      </Routes>

    </BrowserRouter>

  </StrictMode>,
)