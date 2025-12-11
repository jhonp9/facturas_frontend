import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Mail, Building, Lock, Search, Phone, Plus, Trash2, MapPin } from 'lucide-react';
import api from '../api/axios';
import VerificationModal from '../components/VerificationModal';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [empresaId, setEmpresaId] = useState(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [error, setError] = useState('');

  // Estado del formulario
  const [ruc, setRuc] = useState('');
  const [datosEmpresa, setDatosEmpresa] = useState({
    nombreUsuario: '', // <--- NUEVO
    razonSocial: '',
    direccion: '',
    emailContacto: '',
    passwordAdmin: '',
    passwordVendedor: ''
  });
  
  // Manejo de teléfonos múltiples
  const [telefonos, setTelefonos] = useState(['']); // Empieza con 1 vacío

  const [logoFile, setLogoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 1. Buscar RUC
  const handleSearchRUC = async () => {
    if (ruc.length !== 11) {
      setError('El RUC debe tener 11 dígitos');
      return;
    }
    setLoadingSearch(true);
    setError('');
    try {
      // Llamada a nuestro backend
      const res = await api.post('/api/auth/search-ruc', { ruc });
      const data = res.data;
      
      // Rellenar datos automáticamente
      setDatosEmpresa(prev => ({
        ...prev,
        razonSocial: data.razonSocial || data.nombre || '', // Depende de la API
        direccion: data.direccion || data.direccionCompleta || '',
      }));
    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo obtener datos del RUC.');
      // Permitimos que el usuario escriba manualmente si falla la API
    } finally {
      setLoadingSearch(false);
    }
  };

  // Manejadores de Inputs
  const handleChange = (e) => {
    // Si escribe en nombreUsuario, forzamos minúsculas y sin espacios
    if (e.target.name === 'nombreUsuario') {
        setDatosEmpresa({ 
            ...datosEmpresa, 
            [e.target.name]: e.target.value.toLowerCase().replace(/\s+/g, '') 
        });
    } else {
        setDatosEmpresa({ ...datosEmpresa, [e.target.name]: e.target.value });
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Manejadores de Teléfonos
  const handlePhoneChange = (index, value) => {
    const newPhones = [...telefonos];
    newPhones[index] = value;
    setTelefonos(newPhones);
  };

  const addPhoneField = () => setTelefonos([...telefonos, '']);
  
  const removePhoneField = (index) => {
    const newPhones = telefonos.filter((_, i) => i !== index);
    setTelefonos(newPhones);
  };

  // 2. Enviar Registro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoadingRegister(true);

    try {
      const data = new FormData();
      data.append('ruc', ruc);
      data.append('nombreUsuario', datosEmpresa.nombreUsuario);
      data.append('razonSocial', datosEmpresa.razonSocial);
      data.append('direccion', datosEmpresa.direccion);
      data.append('emailContacto', datosEmpresa.emailContacto);
      data.append('passwordAdmin', datosEmpresa.passwordAdmin);
      data.append('passwordVendedor', datosEmpresa.passwordVendedor);
      data.append('logo', logoFile);
      
      // Enviamos teléfonos como string JSON
      // Filtramos vacíos
      const validPhones = telefonos.filter(t => t.trim() !== '');
      data.append('telefonos', JSON.stringify(validPhones));

      const response = await api.post('/api/auth/register', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setEmpresaId(response.data.empresaId);
      setStep(2); // Pasar a modal de verificación
    } catch (err) {
      setError(err.response?.data?.error || 'Error al registrar.');
    } finally {
      setLoadingRegister(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
        
        {step === 1 && (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-slate-800">Registra tu Negocio</h2>
              <p className="mt-2 text-sm text-gray-500">Facturación Electrónica al instante</p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200 animate-pulse">
                {error}
              </div>
            )}

            <div className="space-y-6 mt-8">
              
              {/* BUSCADOR DE RUC */}
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">RUC *</label>
                  <input
                    type="text"
                    maxLength="11"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="20123456789"
                    value={ruc}
                    onChange={(e) => setRuc(e.target.value.replace(/\D/g, ''))}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSearchRUC}
                  disabled={loadingSearch || ruc.length !== 11}
                  className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 h-50px w-50px flex items-center justify-center"
                  title="Buscar datos en SUNAT"
                >
                  {loadingSearch ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"/> : <Search size={24} />}
                </button>
              </div>

              {/* FORMULARIO PRINCIPAL */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* DATOS AUTOMÁTICOS */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-3">
                  <InputGroup 
                    icon={<Building />} 
                    label="Razón Social / Nombre"
                    name="razonSocial" 
                    value={datosEmpresa.razonSocial} 
                    onChange={handleChange} 
                    placeholder="Se llenará automáticamente..."
                    readOnly={!datosEmpresa.razonSocial} // Editable solo si falla la API
                  />
                  <InputGroup 
                    icon={<MapPin />} 
                    label="Dirección Fiscal"
                    name="direccion" 
                    value={datosEmpresa.direccion} 
                    onChange={handleChange} 
                    placeholder="Dirección fiscal..."
                  />
                  {/* --- CAMPO NOMBRE DE USUARIO --- */}
                  <div>
                    <InputGroup 
                        icon={<Building className="text-blue-600" />} 
                        label="Nombre de Usuario Único"
                        name="nombreUsuario" 
                        value={datosEmpresa.nombreUsuario} 
                        onChange={handleChange} 
                        placeholder="ej: miempresa2024"
                        required
                    />
                    {datosEmpresa.nombreUsuario && (
                        <p className="text-[11px] text-blue-600 mt-1 pl-2 font-medium">
                           Tus usuarios serán: <br/>
                           • administrador@{datosEmpresa.nombreUsuario}.com <br/>
                           • vendedor@{datosEmpresa.nombreUsuario}.com
                        </p>
                    )}
                  </div>
                </div>

                {/* LOGO */}
                <div className="flex items-center gap-4 border border-dashed border-gray-300 p-4 rounded-xl hover:border-blue-400 transition-colors bg-gray-50">
                  <div className="h-16 w-16 bg-white border border-gray-200 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                    {previewUrl ? <img src={previewUrl} className="h-full w-full object-cover" /> : <Upload className="text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer">
                      <span className="bg-white px-3 py-1 border border-gray-300 rounded text-xs font-bold hover:bg-gray-50">Seleccionar Logo</span>
                      <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} required />
                    </label>
                    <p className="text-xs text-gray-400">Formato: PNG, JPG (Max 5MB)</p>
                  </div>
                </div>

                {/* CONTACTO & SEGURIDAD */}
                <div className="space-y-3">
                  <InputGroup icon={<Mail />} label="Email de Contacto (Dueño)" name="emailContacto" type="email" value={datosEmpresa.emailContacto} onChange={handleChange} placeholder="correo@gmail.com" />
                  
                  {/* TELEFONOS DINAMICOS */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Teléfonos de Contacto</label>
                    {telefonos.map((tel, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                            <Phone size={18} />
                          </div>
                          <input
                            type="tel"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="999 999 999"
                            value={tel}
                            onChange={(e) => handlePhoneChange(index, e.target.value)}
                          />
                        </div>
                        {telefonos.length > 1 && (
                          <button type="button" onClick={() => removePhoneField(index)} className="text-red-400 hover:text-red-600 p-2">
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addPhoneField} className="text-xs font-bold text-blue-600 flex items-center gap-1 hover:underline mt-1">
                      <Plus size={14} /> Agregar otro teléfono
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <InputGroup icon={<Lock className="text-red-400"/>} label="Clave Admin" name="passwordAdmin" type="password" value={datosEmpresa.passwordAdmin} onChange={handleChange} placeholder="******" />
                    <InputGroup icon={<Lock className="text-green-400"/>} label="Clave Vendedor" name="passwordVendedor" type="password" value={datosEmpresa.passwordVendedor} onChange={handleChange} placeholder="******" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loadingRegister}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-1"
                >
                  {loadingRegister ? 'Procesando...' : 'Crear Cuenta'}
                </button>
              </form>
              
              <div className="text-center">
                <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600 font-medium">¿Ya tienes cuenta? Inicia Sesión</Link>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <VerificationModal 
            empresaId={empresaId} 
            email={datosEmpresa.emailContacto}
            onSuccess={() => navigate('/login')} 
            onCancel={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
};

// Componente auxiliar mejorado con Label
const InputGroup = ({ icon, label, ...props }) => (
  <div>
    {label && <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{label}</label>}
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <input
        required
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm transition-all read-only:bg-gray-100 read-only:text-gray-500"
        {...props}
      />
    </div>
  </div>
);

export default Register;