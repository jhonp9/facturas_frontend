import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, Users, Archive, 
  FileText, PieChart, LogOut, FileBox, ChevronRight
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const SidebarItem = ({ icon, text, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className="block mb-1">
      <div className={`
        flex items-center justify-between px-4 py-3 mx-2 rounded-lg transition-all duration-200
        ${isActive 
          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-blue-600'
        }
      `}>
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium text-sm">{text}</span>
        </div>
        {/* Pequeña flecha si no está activo, opcional */}
        {!isActive && <ChevronRight size={14} className="opacity-50" />}
      </div>
    </Link>
  );
};

const Layout = ({ children, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* SIDEBAR FIJO A LA IZQUIERDA */}
      <aside className="w-64 bg-white shadow-xl fixed h-full z-20 hidden md:flex flex-col">
        {/* Area del Logo */}
        <div className="h-20 flex items-center justify-center border-b border-gray-100 p-4">
          {user?.logo ? (
            <img 
              src={`${API_URL}/uploads/${user.logo}`}
              alt="Logo Empresa" 
              className="h-12 object-contain"
            />
          ) : (
            <h2 className="text-xl font-bold text-blue-600 tracking-tighter">MI NEGOCIO</h2>
          )}
        </div>

        {/* Menú */}
        <div className="flex-1 overflow-y-auto py-6">
          <p className="px-6 text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">Menu Principal</p>
          
          <SidebarItem to="/" icon={<LayoutDashboard size={18} />} text="Dashboard" />
          <SidebarItem to="/ventas" icon={<FileText size={18} />} text="Ventas" />
          <SidebarItem to="/clientes" icon={<Users size={18} />} text="Clientes" />
          <SidebarItem to="/compras" icon={<ShoppingCart size={18} />} text="Compras" />
          <SidebarItem to="/inventario" icon={<Archive size={18} />} text="Inventario" />
          <SidebarItem to="/comprobantes" icon={<FileBox size={18} />} text="Comprobantes" />
          <SidebarItem to="/reportes" icon={<PieChart size={18} />} text="Reportes" />
        </div>

        {/* Footer del Sidebar */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-500 text-sm font-medium hover:bg-red-50 w-full p-2 rounded-lg transition-colors"
          >
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        
        {/* HEADER SUPERIOR */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="text-xl font-semibold text-gray-700">Dashboard</h2>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-gray-800 leading-tight">
                {user?.nombreUsuario || 'Usuario'}
              </p>
              <p className="text-xs text-gray-500 font-medium">
                {user?.email}
              </p>
            </div>
            {/* Avatar Círculo */}
            <div className="h-10 w-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-600 font-bold text-lg">
              {user?.email?.[0]?.toUpperCase() || 'U'}
            </div>
          </div>
        </header>

        {/* PÁGINA INTERNA */}
        <main className="p-6 md:p-10 flex-1 overflow-x-hidden bg-[#f4f6f9]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;