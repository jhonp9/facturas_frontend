import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, Users, Archive, 
  FileText, FileBox, PieChart, LogOut, ChevronRight, User
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const Layout = ({ children, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const menuItems = [
    { to: "/", icon: <LayoutDashboard size={20} />, text: "DASHBOARD" },
    { to: "/ventas", icon: <FileText size={20} />, text: "VENTAS" },
    { to: "/clientes", icon: <Users size={20} />, text: "Clientes" },
    { to: "/compras", icon: <ShoppingCart size={20} />, text: "Compras" },
    { to: "/inventario", icon: <Archive size={20} />, text: "Inventario" },
    { to: "/comprobantes", icon: <FileBox size={20} />, text: "Comprobantes avanzados" },
    { to: "/reportes", icon: <PieChart size={20} />, text: "Reportes" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col z-20">
        
        {/* Logo Area */}
        <div className="h-24 flex items-center justify-center border-b border-gray-100 p-4">
          {user?.logo ? (
            <img 
              src={`${API_URL}/uploads/${user.logo}`} 
              alt="Logo Empresa" 
              className="h-16 object-contain"
            />
          ) : (
            <h2 className="text-2xl font-bold text-blue-800">MI EMPRESA</h2>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase mb-4">Tipo de Menú</p>
          
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link 
                key={item.text} 
                to={item.to}
                className={`
                  flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                    : 'text-gray-600 hover:bg-blue-50 hover:text-blue-700'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-medium text-sm">{item.text}</span>
                </div>
                {!isActive && <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center gap-3 text-red-500 hover:bg-red-50 px-4 py-3 rounded-lg w-full transition-colors font-medium">
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* HEADER */}
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
          <h1 className="text-xl text-gray-700 font-normal">Dashboard</h1>
          
          <div className="flex items-center gap-3">
            <div className="text-right leading-tight">
              <span className="block text-sm font-bold text-gray-700">
                {user?.nombreUsuario || 'Administrador'}
              </span>
              <span className="block text-xs text-gray-500">
                {user?.email}
              </span>
            </div>
            <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
              <User size={20} />
            </div>
          </div>
        </header>

        {/* CONTENIDO SCROLLABLE */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;