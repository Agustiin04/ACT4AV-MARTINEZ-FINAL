'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart,
  Package,
  Users,
  ArrowRight,
  Calendar,
  Download,
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setTimeout(() => setLoading(false), 1000);
  }, []);

 
  const stats = [
    { 
      title: 'Ingresos Totales', 
      value: '$12,580', 
      change: '+12.5%', 
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-600',
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50'
    },
    { 
      title: 'Pedidos Totales', 
      value: '342', 
      change: '+8.2%', 
      trend: 'up',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-600',
      bg: 'bg-gradient-to-br from-blue-50 to-cyan-50'
    },
    { 
      title: 'Productos Activos', 
      value: '1,245', 
      change: '+3.1%', 
      trend: 'up',
      icon: <Package className="w-6 h-6" />,
      color: 'from-amber-500 to-orange-600',
      bg: 'bg-gradient-to-br from-amber-50 to-orange-50'
    },
    { 
      title: 'Usuarios Registrados', 
      value: '5,281', 
      change: '+5.7%', 
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-600',
      bg: 'bg-gradient-to-br from-purple-50 to-pink-50'
    },
  ];

  
  const recentOrders = [
    { id: '#ORD-001', customer: 'María González', date: '2024-01-15', amount: '$249.99', status: 'completed' },
    { id: '#ORD-002', customer: 'Carlos Rodríguez', date: '2024-01-15', amount: '$129.99', status: 'processing' },
    { id: '#ORD-003', customer: 'Ana Martínez', date: '2024-01-14', amount: '$599.99', status: 'completed' },
    { id: '#ORD-004', customer: 'Roberto Sánchez', date: '2024-01-14', amount: '$89.99', status: 'pending' },
    { id: '#ORD-005', customer: 'Lucía Fernández', date: '2024-01-13', amount: '$1,299.99', status: 'completed' },
  ];

  
  const topProducts = [
    { name: 'Laptop Gamer Pro', sales: 142, revenue: '$184,758', growth: '+24%' },
    { name: 'Auriculares Elite', sales: 89, revenue: '$22,249', growth: '+18%' },
    { name: 'Smartwatch Pro', sales: 76, revenue: '$22,799', growth: '+12%' },
    { name: 'Cámara Mirrorless', sales: 54, revenue: '$48,599', growth: '+8%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Bienvenido al panel de control de Aurea Market</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4" />
            Este mes
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className={`${stat.bg} rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Pedidos Recientes</h2>
              <p className="text-gray-600 text-sm">Últimos 5 pedidos</p>
            </div>
            <Link 
              href="/admin/orders"
              className="text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Orden ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Cliente</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Fecha</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Monto</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-800">{order.id}</span>
                    </td>
                    <td className="py-3 px-4">{order.customer}</td>
                    <td className="py-3 px-4 text-gray-600">{order.date}</td>
                    <td className="py-3 px-4 font-medium">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status === 'completed' ? 'Completado' : 
                         order.status === 'processing' ? 'Procesando' : 'Pendiente'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800">Productos Destacados</h2>
              <p className="text-gray-600 text-sm">Más vendidos este mes</p>
            </div>
            <Link 
              href="/admin/products"
              className="text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-600">{product.sales} ventas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{product.revenue}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {product.growth}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Acciones Rápidas</h2>
            <p className="text-amber-100">Gestiona tu tienda de forma eficiente</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/products/create"
              className="px-6 py-3 bg-white text-amber-700 font-bold rounded-xl hover:bg-amber-50 transition-colors shadow-lg"
            >
              + Nuevo Producto
            </Link>
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-colors">
              Ver Reportes
            </button>
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-colors">
              Configurar Tienda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}