import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout'; // El que creamos en la respuesta anterior

function App() {
  // Simulamos estado de usuario logueado (esto luego vendrá de un Contexto o localStorage)
  const user = JSON.parse(localStorage.getItem('user')); 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        
        {/* Rutas protegidas */}
        <Route path="/" element={user ? <Layout user={user}><Dashboard /></Layout> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;