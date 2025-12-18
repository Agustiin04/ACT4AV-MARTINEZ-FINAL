// app/dashboard/page.tsx - VERSIÓN MEJORADA
'use client';

import { useAuth } from '@/contexts/auth-context';
import { Package, User, ShoppingBag, CreditCard, Clock, CheckCircle, Truck, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  const orders = [
    { id: 'ORD-001', date: '2024-12-15', total: 1499.99, status: 'Entregado', items: 2 },
    { id: 'ORD-002', date: '2024-12-10', total: 249.99, status: 'En camino', items: 1 },
    { id: 'ORD-003', date: '2024-12-05', total: 799.99, status: 'Procesando', items: 1 },
  ];

  const stats = [
    { label: 'Pedidos totales', value: '12', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'Total gastado', value: '$2,549.97', icon: CreditCard, color: 'bg-green-500' },
    { label: 'Pedidos activos', value: '3', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Productos fav', value: '7', icon: Package, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="opacity-90">Bienvenido de nuevo, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center space-x-3">
                  <User className="h-6 w-6" />
                  <div>
                    <p className="font-medium">{user.email}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${user.role === 'ADMIN' ? 'bg-red-500' : 'bg-green-500'}`}>
                      {user.role}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition"
              >
                <LogOut className="h-5 w-5" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        
        <div className="flex space-x-2 mb-8 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-3 font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-3 font-medium ${activeTab === 'orders' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Pedidos
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-3 font-medium ${activeTab === 'settings' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          >
            Configuración
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                      <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Pedidos Recientes</h2>
                <Link href="/orders" className="text-blue-600 hover:text-blue-700 font-medium">
                  Ver todos →
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 text-gray-600 font-medium">ID Pedido</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Fecha</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Total</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Items</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Estado</th>
                      <th className="text-left py-3 text-gray-600 font-medium">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 font-medium">{order.id}</td>
                        <td className="py-4 text-gray-600">{order.date}</td>
                        <td className="py-4 font-bold">${order.total.toFixed(2)}</td>
                        <td className="py-4 text-gray-600">{order.items} productos</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                            order.status === 'En camino' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4">
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            Ver detalles
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3">Continuar comprando</h3>
                <p className="text-blue-100 mb-4">Descubre nuevos productos en nuestro catálogo</p>
                <Link href="/products" className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
                  Ver productos
                </Link>
              </div>
              
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3">Tu carrito</h3>
                <p className="text-purple-100 mb-4">Tienes 3 items pendientes en tu carrito</p>
                <Link href="/cart" className="inline-block bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
                  Ver carrito
                </Link>
              </div>
              
              {user.role === 'ADMIN' && (
                <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl p-6">
                  <h3 className="text-lg font-bold mb-3">Panel de Administración</h3>
                  <p className="text-red-100 mb-4">Gestiona productos, usuarios y pedidos</p>
                  <Link href="/admin" className="inline-block bg-white text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
                    Ir al panel
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Mis Pedidos</h2>
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{order.id}</h3>
                      <p className="text-gray-600 text-sm">Fecha: {order.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                      order.status === 'En camino' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-700">{order.items} productos</p>
                      <p className="text-2xl font-bold text-gray-900">${order.total.toFixed(2)}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Ver detalles
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Rastrear pedido
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Configuración de la cuenta</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Información personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Correo electrónico</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Seguridad</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nueva contraseña</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Ingresa nueva contraseña"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confirmar contraseña</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Confirma la contraseña"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}