import React, { useState } from 'react';
import api from '../api/axios';

const VerificationModal = ({ empresaId, email, onSuccess, onCancel }) => {
  const [codigo, setCodigo] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/api/auth/verify', { empresaId, codigo });
      // Si todo sale bien
      alert('¡Cuenta verificada! Ahora puedes iniciar sesión.');
      onSuccess();
    } catch (err) {
      setError('Código incorrecto o expirado.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full shadow-2xl animate-fade-in-up">
        <h3 className="text-xl font-bold text-center mb-4">Verificar Email</h3>
        <p className="text-sm text-gray-600 text-center mb-6">
          Hemos enviado un código a <strong>{email}</strong>. Ingrésalo abajo.
        </p>

        {error && <p className="text-red-500 text-xs text-center mb-2">{error}</p>}

        <form onSubmit={handleVerify}>
          <input
            type="text"
            maxLength="6"
            className="w-full text-center text-2xl tracking-widest border border-gray-300 rounded-md p-2 mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="000000"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
            >
              Atrás
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-semibold"
            >
              {loading ? '...' : 'Verificar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationModal;