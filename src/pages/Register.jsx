import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Mail, Lock, Building, User } from 'lucide-react';
import api from '../api/axios';
import VerificationModal from '../components/VerificationModal';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Formulario, 2: Modal Verificación
  const [empresaId, setEmpresaId] = useState(null);
  
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    emailContacto: '',
    passwordAdmin: '',
    passwordVendedor: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Manejar cambios en inputs de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Manejar subida de logo con previsualización
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Enviar formulario al Backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Usamos FormData porque enviamos un archivo (imagen)
      const data = new FormData();
      data.append('nombreUsuario', formData.nombreUsuario);
      data.append('emailContacto', formData.emailContacto);
      data.append('passwordAdmin', formData.passwordAdmin);
      data.append('passwordVendedor', formData.passwordVendedor);
      data.append('logo', logoFile);

      // Ajusta la URL a tu backend (ej: http://localhost:3000/api/auth/register)
      const response = await api.post('/api/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setEmpresaId(response.data.empresaId);
      setStep(2); // Abrir modal de verificación

    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        {step === 1 && (
          <>
            <div className="text-center">
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Registra tu Negocio</h2>
              <p className="mt-2 text-sm text-gray-600">
                Configura tu cuenta administradora y de vendedor
              </p>
            </div>

            {error && <div className="bg-red-100 text-red-700 p-3 rounded text-sm text-center">{error}</div>}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* LOGO UPLOAD */}
              <div className="flex flex-col items-center justify-center">
                <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 overflow-hidden relative">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Upload className="text-gray-400 mb-2" />
                      <span className="text-xs text-gray-500">Subir Logo</span>
                    </>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} required />
                </label>
                <p className="text-xs text-gray-400 mt-2">Obligatorio para facturas</p>
              </div>

              <div className="rounded-md shadow-sm space-y-4">
                {/* Nombre Usuario / Empresa */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="nombreUsuario"
                    type="text"
                    required
                    className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    placeholder="Nombre Usuario (Único)"
                    value={formData.nombreUsuario}
                    onChange={handleChange}
                  />
                </div>

                {/* Email de Contacto */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    name="emailContacto"
                    type="email"
                    required
                    className="pl-10 block w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 p-2 border"
                    placeholder="Correo de contacto (Gmail/Hotmail)"
                    value={formData.emailContacto}
                    onChange={handleChange}
                  />
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Contraseñas de acceso:</p>
                  
                  {/* Password Admin */}
                  <div className="relative mb-3">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-red-400" />
                    </div>
                    <input
                      name="passwordAdmin"
                      type="password"
                      required
                      className="pl-10 block w-full border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 p-2 border"
                      placeholder="Contraseña para Administrador"
                      value={formData.passwordAdmin}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-400 mt-1 pl-1">Usuario será: administrador@{formData.nombreUsuario || '...'}.com</p>
                  </div>

                  {/* Password Vendedor */}
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-green-400" />
                    </div>
                    <input
                      name="passwordVendedor"
                      type="password"
                      required
                      className="pl-10 block w-full border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 p-2 border"
                      placeholder="Contraseña para Vendedor"
                      value={formData.passwordVendedor}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-gray-400 mt-1 pl-1">Usuario será: vendedor@{formData.nombreUsuario || '...'}.com</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-blue-500/30 transition-all"
              >
                {loading ? 'Procesando...' : 'Registrar y Enviar Código'}
              </button>
            </form>
            <div className="text-center mt-4">
               <Link to="/login" className="text-sm text-blue-600 hover:underline">¿Ya tienes cuenta? Inicia sesión</Link>
            </div>
          </>
        )}

        {/* MODAL DE VERIFICACIÓN */}
        {step === 2 && (
          <VerificationModal 
            empresaId={empresaId} 
            email={formData.emailContacto}
            onSuccess={() => navigate('/login')} // Si valida ok, va al login
            onCancel={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
};

export default Register;