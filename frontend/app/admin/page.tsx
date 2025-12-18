'use client';

import { BarChart3, Package, Users, DollarSign, TrendingUp } from 'lucide-react';

export default function AdminPage() {
  const stats = [
    { label: 'Productos totales', value: '156', change: '+12%', icon: Package, color: 'bg-blue-500' },
    { label: 'Usuarios registrados', value: '2,845', change: '+5%', icon: Users, color: 'bg-green-500' },
    { label: 'Ingresos mensuales', value: '$45,230', change: '+18%', icon: DollarSign, color: 'bg-purple-500' },
    { label: 'Pedidos activos', value: '89', change: '-3%', icon: BarChart3, color: 'bg-yellow-500' },
  ];

  const recentActivities = [
    { user: 'Juan Pérez', action: 'creó un nuevo producto', time: 'Hace 5 minutos', type: 'product' },
    { user: 'María Gómez', action: 'realizó un pedido', time: 'Hace 15 minutos', type: 'order' },
    { user: 'Carlos López', action: 'se registró en la plataforma', time: 'Hace 30 minutos', type: 'user' },
    { user: 'Admin', action: 'actualizó configuración', time: 'Hace 1 hora', type: 'system' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard de Administración</h1>
      <p className="text-gray-600 mb-8">Resumen general y estadísticas del sistema</p>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <span className={`px-2 py-1 rounded text-sm font-medium ${
                stat.change.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-gray-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Actividad Reciente</h2>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Ver todo →
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center p-4 rounded-lg hover:bg-gray-50">
                <div className={`p-3 rounded-full mr-4 ${
                  activity.type === 'product' ? 'bg-blue-100' :
                  activity.type === 'order' ? 'bg-green-100' :
                  activity.type === 'user' ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  {activity.type === 'product' && <Package className="h-5 w-5" />}
                  {activity.type === 'order' && <DollarSign className="h-5 w-5" />}
                  {activity.type === 'user' && <Users className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">
                    <span className="text-gray-800">{activity.user}</span>{' '}
                    <span className="text-gray-600">{activity.action}</span>
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Acciones Rápidas</h2>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center">
                <Package className="h-5 w-5 mr-3 text-blue-500" />
                <span>Agregar nuevo producto</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-green-500" />
                <span>Ver todos los usuarios</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-3 text-purple-500" />
                <span>Ver reportes de ventas</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
            
            <button className="w-full flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-3 text-yellow-500" />
                <span>Configurar promociones</span>
              </div>
              <span className="text-gray-400">→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}