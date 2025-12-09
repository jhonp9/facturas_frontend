import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, Users, ShoppingBag, 
  Package, FileText, PieChart, LogOut, Menu 
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Sidebar = ({ logoUrl, onLogout }) => {
  return (
    <div className="w-64 h-screen bg-white shadow-lg fixed left-0 top-0 flex flex-col z-10">
      {/* Zona del Logo de la Empresa */}
      <div className="h-20 flex items-center justify-center border-b border-gray-100 p-4">
        {logoUrl ? (
          <img 
            src={`${API_URL}/uploads/${logoUrl}`}
            alt="Logo Empresa" 
            className="h-full object-contain"
          />
        ) : (
          <h2 className="text-xl font-bold text-blue-600">Mi Empresa</h2>
        )}
      </div>

      {/* Menú de Opciones */}
      <nav className="flex-1 overflow-y-auto py-4">
        <p className="px-6 text-xs text-gray-400 uppercase font-semibold mb-2">Menu Principal</p>
        
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
        <SidebarItem icon={<FileText size={20} />} text="Ventas" hasSubmenu />
        <SidebarItem icon={<Users size={20} />} text="Clientes" />
        <SidebarItem icon={<ShoppingBag size={20} />} text="Compras" />
        <SidebarItem icon={<Package size={20} />} text="Inventario" />
        <SidebarItem icon={<FileText size={20} />} text="Comprobantes" />
        <SidebarItem icon={<PieChart size={20} />} text="Reportes" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, text, active, hasSubmenu }) => (
  <div className={`
    group flex items-center justify-between px-6 py-3 cursor-pointer transition-all duration-200 border-l-4
    ${active 
      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold' // Estado Activo
      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700' // Estado Normal
    }
  `}>
    <div className="flex items-center gap-3">
      {/* El icono cambia de color sutilmente */}
      <span className={`${active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
        {icon}
      </span>
      <span className="text-sm">{text}</span>
    </div>
    
    {hasSubmenu && (
      <span className="text-[10px] text-gray-400">▼</span>
    )}
  </div>
);

// Componente Principal que une todo
const Layout = ({ children, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar Fijo */}
      <Sidebar logoUrl={user?.logo} onLogout={handleLogout} />

      {/* Contenido Principal */}
      <div className="ml-64 transition-all">
        
        {/* Header Superior */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-gray-700">Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-700">{user?.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user?.rol}</p>
            </div>
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold cursor-pointer relative group">
              {user?.email[0].toUpperCase()}
              {/* Dropdown simple de cerrar sesión */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-lg rounded-md hidden group-hover:block border">
                <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-500 flex items-center gap-2">
                  <LogOut size={16}/> Cerrar Sesión
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Contenido Dinámico (Dashboard, etc) */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;