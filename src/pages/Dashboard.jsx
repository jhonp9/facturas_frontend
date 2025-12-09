import React from 'react';
import { FilePlus, FileText, Receipt, PieChart, DollarSign, ShoppingCart, Package } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      
      {/* Contenedor Principal Blanco */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 min-h-[500px] flex flex-col md:flex-row">
        
        {/* Lado Izquierdo: Saludo */}
        <div className="md:w-5/12 flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-gray-100 pr-0 md:pr-8 py-8 md:py-0">
          <h1 className="text-5xl font-extrabold text-slate-700 mb-3 tracking-tight">Hola</h1>
          <p className="text-slate-400 text-xl font-medium">¿Qué deseas hacer hoy?</p>
        </div>

        {/* Lado Derecho: Botones de Acción */}
        <div className="md:w-7/12 pl-0 md:pl-12 pt-8 md:pt-0 flex flex-col gap-8 justify-center">
          
          {/* Sección Facturación (ROJO) */}
          <div>
            <h3 className="text-slate-700 font-bold mb-4 text-sm uppercase tracking-wider border-l-4 border-red-500 pl-2">
              Facturación
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <ActionButton 
                color="bg-rose-500 hover:bg-rose-600" 
                icon={<FilePlus size={28} />} 
                title="Nuevo CPE" 
                desc="Factura/Boleta"
              />
              <ActionButton 
                color="bg-rose-500 hover:bg-rose-600" 
                icon={<Receipt size={28} />} 
                title="Nueva Nota" 
                desc="De venta"
              />
              <ActionButton 
                color="bg-rose-500 hover:bg-rose-600" 
                icon={<FileText size={28} />} 
                title="Cotización" 
                desc="Proforma"
              />
            </div>
          </div>

          {/* Sección Reportes (VERDE) */}
          <div>
            <h3 className="text-slate-700 font-bold mb-4 text-sm uppercase tracking-wider border-l-4 border-emerald-500 pl-2">
              Reportes
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ReportButton color="bg-emerald-500 hover:bg-emerald-600" icon={<PieChart />} text="Contable" />
              <ReportButton color="bg-emerald-500 hover:bg-emerald-600" icon={<DollarSign />} text="Ventas" />
              <ReportButton color="bg-emerald-500 hover:bg-emerald-600" icon={<ShoppingCart />} text="Compras" />
              <ReportButton color="bg-emerald-500 hover:bg-emerald-600" icon={<Package />} text="Inventario" />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// Componente Botón Grande (Facturación)
const ActionButton = ({ color, icon, title, desc }) => (
  <button className={`${color} text-white rounded-xl shadow-md transform transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-center p-4 h-28 gap-2 w-full`}>
    <div className="bg-white/20 p-2 rounded-full mb-1">
      {icon}
    </div>
    <div className="text-center">
      <span className="block font-bold text-sm leading-tight">{title}</span>
      {desc && <span className="block text-xs text-white/80 mt-1">{desc}</span>}
    </div>
  </button>
);

// Componente Botón Pequeño (Reportes)
const ReportButton = ({ color, icon, text }) => (
  <button className={`${color} text-white rounded-lg shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center p-3 h-24 gap-2 w-full`}>
    {icon}
    <span className="text-center font-medium text-xs">{text}</span>
  </button>
);

export default Dashboard;