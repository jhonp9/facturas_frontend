import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import api from '../api/axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  // Ahora tenemos un paso 4 para el mensaje de éxito
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Datos
  const [email, setEmail] = useState('');
  const [empresaId, setEmpresaId] = useState(null);
  const [codigo, setCodigo] = useState('');
  
  // Paso 3
  const [targetRol, setTargetRol] = useState('ADMIN'); 
  const [newPassword, setNewPassword] = useState('');

  // PASO 1: Enviar correo
  const handleRequestCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/api/auth/forgot-password', { email });
      setEmpresaId(res.data.empresaId);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al buscar cuenta.');
    } finally {
      setLoading(false);
    }
  };

  // PASO 2: Verificar Código
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/auth/verify-reset-code', { empresaId, codigo });
      setStep(3);
    } catch (err) {
      setError('Código incorrecto.');
    } finally {
      setLoading(false);
    }
  };

  // PASO 3: Cambiar Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api.post('/api/auth/reset-password', {
        empresaId,
        codigo, 
        targetRol,
        newPassword
      });
      // CAMBIO: En lugar de alert, pasamos al paso 4 (Éxito)
      setStep(4);
    } catch (err) {
      setError('Error al actualizar la contraseña.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        
        {/* Cabecera solo si no estamos en el paso final de éxito */}
        {step !== 4 && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Recuperar Contraseña</h2>
            <p className="text-sm text-gray-500 mt-2">Sigue los pasos para restablecer el acceso.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center mb-6 border border-red-200">
            {error}
          </div>
        )}

        {/* --- PASO 1: EMAIL --- */}
        {step === 1 && (
          <form onSubmit={handleRequestCode} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Correo de Contacto</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={20} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="ejemplo@empresa.com"
                />
              </div>
            </div>
            <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium flex justify-center items-center gap-2">
              {loading ? 'Buscando...' : 'Enviar Código'} <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* --- PASO 2: CÓDIGO --- */}
        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="space-y-6 animate-fade-in">
            <div className="text-center">
              <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Mail size={32} />
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Hemos enviado un código a <strong>{email}</strong>
              </p>
            </div>
            <div>
              <input
                type="text"
                required
                maxLength="6"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                className="block w-full text-center text-3xl font-mono tracking-widest border border-gray-300 rounded-lg py-3 focus:ring-2 focus:ring-blue-500 outline-none uppercase"
                placeholder="000000"
              />
            </div>
            <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium">
              {loading ? 'Verificando...' : 'Verificar Código'}
            </button>
            <button type="button" onClick={() => setStep(1)} className="w-full text-gray-500 text-sm mt-2 hover:underline">
              Cambiar correo
            </button>
          </form>
        )}

        {/* --- PASO 3: SELECCIÓN Y NUEVA PASS --- */}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-6 animate-fade-in">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">¿Qué cuenta deseas recuperar?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTargetRol('ADMIN')}
                  className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${targetRol === 'ADMIN' ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <ShieldCheck size={24} />
                  <span className="text-sm font-bold">Administrador</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTargetRol('VENDEDOR')}
                  className={`p-4 border rounded-xl flex flex-col items-center gap-2 transition-all ${targetRol === 'VENDEDOR' ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-500' : 'border-gray-200 hover:bg-gray-50'}`}
                >
                  <UserIcon />
                  <span className="text-sm font-bold">Vendedor</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nueva Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Ingresa la nueva clave"
                />
              </div>
            </div>

            <button disabled={loading} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium flex justify-center items-center gap-2 shadow-lg shadow-green-500/30">
              {loading ? 'Guardando...' : 'Confirmar Cambio'} <CheckCircle size={18} />
            </button>
          </form>
        )}

        {/* --- PASO 4: ÉXITO (NUEVO) --- */}
        {step === 4 && (
          <div className="text-center animate-fade-in py-6">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle size={48} className="text-green-600" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">¡Contraseña Actualizada!</h3>
            <p className="text-gray-600 mb-8">
              Tu clave ha sido cambiada correctamente. Ya puedes acceder con tus nuevas credenciales.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Aceptar e Iniciar Sesión
            </button>
          </div>
        )}

        {step !== 4 && (
          <div className="mt-6 text-center pt-4 border-t border-gray-100">
            <Link to="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">
              Volver al Inicio de Sesión
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Icono auxiliar
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default ForgotPassword;