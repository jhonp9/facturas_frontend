import React from 'react';
import { FileText, FilePlus, Receipt, PieChart, DollarSign, ShoppingCart, Package } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[80vh]">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* COLUMNA IZQUIERDA: SALUDO */}
        <div className="lg:col-span-4 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-slate-600 mb-2">Hola</h1>
          <p className="text-xl text-blue-500 font-medium">¿Qué deseas hacer hoy?</p>
        </div>

        {/* COLUMNA DERECHA: ACCIONES */}
        <div className="lg:col-span-8 flex flex-col justify-between gap-10">
          
          {/* SECCIÓN FACTURACIÓN (ROJO) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Facturación</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <BigCard color="bg-red-500 hover:bg-red-600" icon={<FilePlus size={28}/>} title="Nuevo CPE" subtitle="Factura / Boleta" />
              <BigCard color="bg-red-500 hover:bg-red-600" icon={<Receipt size={28}/>} title="Nueva nota" subtitle="De venta" />
              <BigCard color="bg-red-500 hover:bg-red-600" icon={<FileText size={28}/>} title="Nueva cotización" subtitle="Proforma" />
            </div>
          </div>

          {/* ESPACIO VACÍO PARA BALANCE VISUAL (O GRÁFICOS FUTUROS) */}
          <div className="flex-grow border-t border-dashed border-gray-200 my-4"></div>

          {/* SECCIÓN REPORTES (VERDE) */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider border-b pb-2">Reportes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <SmallCard color="bg-green-600 hover:bg-green-700" icon={<PieChart size={24}/>} title="Reporte contable" />
              <SmallCard color="bg-green-600 hover:bg-green-700" icon={<DollarSign size={24}/>} title="Reporte de ventas" />
              <SmallCard color="bg-green-600 hover:bg-green-700" icon={<ShoppingCart size={24}/>} title="Reporte de compras" />
              <SmallCard color="bg-green-600 hover:bg-green-700" icon={<Package size={24}/>} title="Reporte de productos" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Componente Tarjeta Grande (Rojo)
const BigCard = ({ color, icon, title, subtitle }) => (
  <button className={`${color} text-white p-6 rounded-lg shadow-lg shadow-red-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-2 h-32 w-full`}>
    <div className="opacity-90 mb-1">{icon}</div>
    <span className="font-bold text-sm block">{title}</span>
    {subtitle && <span className="text-xs opacity-80 font-light">{subtitle}</span>}
  </button>
);

// Componente Tarjeta Pequeña (Verde)
const SmallCard = ({ color, icon, title }) => (
  <button className={`${color} text-white p-4 rounded-lg shadow-lg shadow-green-100 transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center gap-2 h-24 w-full`}>
    <div className="opacity-90">{icon}</div>
    <span className="font-semibold text-xs text-center leading-tight">{title}</span>
  </button>
);

export default Dashboard;