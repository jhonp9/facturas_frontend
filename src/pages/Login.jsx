import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';
import api from '../api/axios';
// Asegúrate de tener una imagen o usar una URL externa si logo.png falla
import logoImg from '../assets/logo.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      window.location.href = "/";
    } catch (err) {
      setError(err.response?.data?.error || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
  };

  return (
    // CONTENEDOR PRINCIPAL: Flex row para poner uno al lado del otro
    <div className="flex w-full h-screen overflow-hidden">
      
      {/* IZQUIERDA: FORMULARIO (w-full en movil, w-1/2 en escritorio) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          
          {/* Cabecera del Login */}
          <div className="text-center mb-10">
            {/* Si no carga el logo local, mostrar texto */}
            <div className="flex justify-center mb-4">
               <img src={logoImg} alt="Logo" className="h-20 object-contain" onError={(e) => e.target.style.display='none'} />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Bienvenido a <span className="text-blue-600">JP</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Ingresa a tu cuenta para gestionar tus ventas
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md text-sm shadow-sm">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-5">
              
              {/* Input Correo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Mail size={20} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    placeholder="admin@empresa.com"
                  />
                </div>
              </div>

              {/* Input Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  {/* CAMBIO AQUÍ */}
                  <Link to="/forgot-password" className="text-xs font-medium text-blue-600 hover:text-blue-500">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={20} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all transform hover:-translate-y-0.5"
            >
              {loading ? 'Iniciando...' : (
                <>
                  INICIAR SESIÓN <LogIn size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" className="font-bold text-blue-600 hover:text-blue-500 transition-colors">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* DERECHA: IMAGEN (Oculta en movil, w-1/2 en escritorio) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80" 
          alt="Oficina" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay azul encima de la imagen */}
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply"></div>
        
        {/* Texto sobre la imagen */}
        <div className="absolute bottom-20 left-10 text-white p-8">
            <h2 className="text-4xl font-bold mb-4">Gestiona tu negocio eficientemente</h2>
            <p className="text-lg opacity-90">Controla tu inventario, realiza facturación electrónica y obtén reportes detallados en tiempo real.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;