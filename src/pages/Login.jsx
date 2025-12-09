import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import api from '../api/axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/register', {
        email, 
        password
      });

      // Guardar token y usuario en localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirigir al Dashboard (recargar para que App.jsx lea el localStorage)
      window.location.href = "/";
      
    } catch (err) {
      setError('Credenciales inválidas o cuenta no verificada');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido</h1>
          <p className="text-gray-500 text-sm">Ingresa a tu sistema de facturación</p>
        </div>

        {error && <div className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4 text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="email" 
              placeholder="admin@empresa.com" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
            <input 
              type="password" 
              placeholder="Contraseña" 
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/30 transition-all"
          >
            Ingresar
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">¿No tienes cuenta? </span>
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;