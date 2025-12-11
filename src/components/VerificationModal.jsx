import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react'; // Importamos un icono para que se vea mejor
import api from '../api/axios';

const VerificationModal = ({ empresaId, email, onSuccess, onCancel }) => {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false); // Nuevo estado para controlar la vista de éxito

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/auth/verify', { empresaId, codigo });
      // En lugar de alert(), cambiamos el estado para mostrar la vista de éxito
      setVerified(true);
    } catch (err) {
      setError('Código incorrecto o expirado.');
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-2xl animate-fade-in-up">
        
        {verified ? (
          /* --- VISTA DE ÉXITO --- */
          <div className="text-center animate-fade-in">
            <div className="flex justify-center mb-4">
              <CheckCircle size={56} className="text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">¡Cuenta Verificada!</h3>
            <p className="text-gray-600 mb-6">
              Tu registro se ha completado exitosamente. Ahora puedes iniciar sesión.
            </p>
            <button
              onClick={onSuccess} // Esto ejecutará la navegación al login
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-bold shadow-lg shadow-blue-500/30 transition-all transform hover:-translate-y-0.5"
            >
              Aceptar
            </button>
          </div>
        ) : (
          /* --- VISTA DE FORMULARIO (La que ya tenías) --- */
          <>
            <h3 className="text-xl font-bold text-center mb-4">Verificar Email</h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Hemos enviado un código a <strong>{email}</strong>. Ingrésalo abajo.
            </p>

            {error && <p className="text-red-500 text-xs text-center mb-2 font-medium bg-red-50 p-1 rounded">{error}</p>}

            <form onSubmit={handleVerify}>
              <input
                type="text"
                maxLength="6"
                className="w-full text-center text-3xl font-mono tracking-[0.5em] border border-gray-300 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-blue-500 outline-none transition-all uppercase placeholder:tracking-normal"
                placeholder="000000"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold shadow-md transition-colors disabled:opacity-70"
                >
                  {loading ? 'Verificando...' : 'Verificar'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationModal;