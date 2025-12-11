import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Mail, Building, User, Lock, ArrowRight } from 'lucide-react';
import api from '../api/axios';
import VerificationModal from '../components/VerificationModal';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = new FormData();
      data.append('nombreUsuario', formData.nombreUsuario);
      data.append('emailContacto', formData.emailContacto);
      data.append('passwordAdmin', formData.passwordAdmin);
      data.append('passwordVendedor', formData.passwordVendedor);
      data.append('logo', logoFile);

      const response = await api.post('/api/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setEmpresaId(response.data.empresaId);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        
        {step === 1 && (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Crea tu cuenta</h2>
              <p className="mt-2 text-sm text-gray-500">Configura tu negocio en minutos</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              
              {/* LOGO UPLOAD CIRCULAR */}
              <div className="flex flex-col items-center">
                <label className={`w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-full cursor-pointer transition-all relative overflow-hidden group ${previewUrl ? 'border-blue-500' : 'border-gray-300 hover:border-blue-400'}`}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-2">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 group-hover:text-blue-500" />
                      <span className="text-[10px] text-gray-500 font-medium mt-1 block">Subir Logo *</span>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} required />
                </label>
              </div>

              <div className="space-y-4">
                <InputGroup icon={<Building />} name="nombreUsuario" placeholder="Nombre de Empresa (Único)" value={formData.nombreUsuario} onChange={handleChange} />
                <InputGroup icon={<Mail />} name="emailContacto" type="email" placeholder="Correo Personal (Gmail/Hotmail)" value={formData.emailContacto} onChange={handleChange} />
                
                <div className="bg-gray-50 p-4 rounded-xl space-y-4 border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seguridad de Cuentas</p>
                  
                  <div>
                    <InputGroup icon={<Lock className="text-red-400"/>} name="passwordAdmin" type="password" placeholder="Contraseña Administrador" value={formData.passwordAdmin} onChange={handleChange} />
                    <p className="text-[10px] text-gray-400 mt-1 pl-2">Usuario: admin@{formData.nombreUsuario || '...'}.com</p>
                  </div>

                  <div>
                    <InputGroup icon={<Lock className="text-green-400"/>} name="passwordVendedor" type="password" placeholder="Contraseña Vendedor" value={formData.passwordVendedor} onChange={handleChange} />
                    <p className="text-[10px] text-gray-400 mt-1 pl-2">Usuario: vendedor@{formData.nombreUsuario || '...'}.com</p>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-500/30 transition-all"
              >
                {loading ? 'Procesando...' : 'Registrar y Enviar Código'}
                {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
              </button>
            </form>
            
            <p className="text-center text-sm text-gray-600">
              ¿Ya tienes cuenta? <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">Inicia Sesión</Link>
            </p>
          </>
        )}

        {step === 2 && (
          <VerificationModal 
            empresaId={empresaId} 
            email={formData.emailContacto}
            onSuccess={() => navigate('/login')} 
            onCancel={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
};

// Componente auxiliar para inputs
const InputGroup = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
      {React.cloneElement(icon, { size: 18 })}
    </div>
    <input
      required
      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
      {...props}
    />
  </div>
);

export default Register;