import React from 'react';
import { FilePlus, FileText, Receipt, PieChart, DollarSign, ShoppingCart, Package } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="animate-fade-in-up space-y-8">
      
      {/* TARJETA PRINCIPAL BLANCA */}
      <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12 flex flex-col lg:flex-row gap-10 min-h-[500px]">
        
        {/* SECCIÓN IZQUIERDA: SALUDO */}
        <div className="lg:w-1/3 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-8">
          <h1 className="text-6xl font-extrabold text-slate-700 mb-4 tracking-tight">
            Hola
          </h1>
          <p className="text-slate-400 text-xl font-medium">
            ¿Qué deseas hacer hoy?
          </p>
        </div>

        {/* SECCIÓN DERECHA: BOTONES DE ACCIÓN */}
        <div className="lg:w-2/3 flex flex-col justify-center gap-10">
          
          {/* GRUPO 1: FACTURACIÓN (ROJO) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-1 bg-red-500 rounded-full"></div>
              <h3 className="text-slate-700 font-bold text-lg">Facturación</h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <ActionButton 
                color="bg-[#dc3545] hover:bg-red-700" 
                icon={<FilePlus size={32} />} 
                title="Nuevo CPE" 
                subtitle="Factura / Boleta"
              />
              <ActionButton 
                color="bg-[#dc3545] hover:bg-red-700" 
                icon={<Receipt size={32} />} 
                title="Nueva nota" 
                subtitle="De venta"
              />
              <ActionButton 
                color="bg-[#dc3545] hover:bg-red-700" 
                icon={<FileText size={32} />} 
                title="Nueva cotización" 
                subtitle="Proforma"
              />
            </div>
          </div>

          <div className="border-t border-gray-50"></div>

          {/* GRUPO 2: REPORTES (VERDE) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-1 bg-green-500 rounded-full"></div>
              <h3 className="text-slate-700 font-bold text-lg">Reportes</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ReportButton color="bg-[#28a745] hover:bg-green-700" icon={<PieChart size={24} />} text="Contable" />
              <ReportButton color="bg-[#28a745] hover:bg-green-700" icon={<DollarSign size={24} />} text="Ventas" />
              <ReportButton color="bg-[#28a745] hover:bg-green-700" icon={<ShoppingCart size={24} />} text="Compras" />
              <ReportButton color="bg-[#28a745] hover:bg-green-700" icon={<Package size={24} />} text="Productos" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// Componente para botones rojos grandes
const ActionButton = ({ color, icon, title, subtitle }) => (
  <button className={`${color} text-white rounded-xl shadow-lg shadow-red-100 hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 p-6 flex flex-col items-center justify-center gap-3 h-32 w-full`}>
    <div className="opacity-90">{icon}</div>
    <div className="text-center">
      <span className="block font-semibold text-sm">{title}</span>
      {subtitle && <span className="block text-xs opacity-80 font-light mt-1">{subtitle}</span>}
    </div>
  </button>
);

// Componente para botones verdes pequeños
const ReportButton = ({ color, icon, text }) => (
  <button className={`${color} text-white rounded-lg shadow-md shadow-green-100 hover:shadow-lg transform transition-all duration-200 hover:-translate-y-1 p-4 flex flex-col items-center justify-center gap-2 h-24 w-full`}>
    <div className="opacity-90">{icon}</div>
    <span className="text-xs font-semibold text-center">{text}</span>
  </button>
);

export default Dashboard;