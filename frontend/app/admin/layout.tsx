'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingBag,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  BarChart3,
  Shield,
  Bell,
  Search
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { user, logout, isAdmin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  if (!isAdmin) {
    router.push('/');
    return null;
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin' },
    { id: 'products', label: 'Productos', icon: <Package className="w-5 h-5" />, path: '/admin/products' },
    { id: 'orders', label: 'Pedidos', icon: <ShoppingBag className="w-5 h-5" />, path: '/admin/orders' },
    { id: 'users', label: 'Usuarios', icon: <Users className="w-5 h-5" />, path: '/admin/users' },
    { id: 'analytics', label: 'Analíticas', icon: <BarChart3 className="w-5 h-5" />, path: '/admin/analytics' },
    { id: 'settings', label: 'Configuración', icon: <Settings className="w-5 h-5" />, path: '/admin/settings' },
  ];

  const stats = [
    { label: 'Ingresos Totales', value: '$12,580', change: '+12.5%', color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Pedidos', value: '342', change: '+8.2%', color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Productos', value: '1,245', change: '+3.1%', color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Usuarios', value: '5,281', change: '+5.7%', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50/30">
      
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-gradient-to-b from-amber-900 to-amber-800 pt-5 pb-4 overflow-y-auto">
         
          <div className="flex items-center justify-center px-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Aurea Admin</h1>
                <p className="text-xs text-amber-200">Panel de control</p>
              </div>
            </div>
          </div>

          
          <nav className="flex-1 px-4 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  router.push(item.path);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === item.id
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'text-amber-100 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
                {activeSection === item.id && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </button>
            ))}
          </nav>

          
          <div className="px-4 mt-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <span className="font-bold text-white">{user?.name?.charAt(0) || 'A'}</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{user?.name || 'Administrador'}</p>
                  <p className="text-xs text-amber-200">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </aside>

      
      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 bg-white border-b border-amber-100 shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>

              
              <div className="flex-1 max-w-2xl mx-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar en el panel..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-600 hover:text-amber-600 rounded-lg hover:bg-amber-50">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="hidden lg:flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-medium text-gray-800">{user?.name}</p>
                    <p className="text-sm text-gray-600">Administrador</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="font-bold text-white">{user?.name?.charAt(0) || 'A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>

      
      {sidebarOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-b from-amber-900 to-amber-800 pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center justify-between px-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white">Aurea Admin</h1>
                    <p className="text-xs text-amber-200">Panel de control</p>
                  </div>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 text-amber-200 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="space-y-2 px-4">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveSection(item.id);
                      router.push(item.path);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeSection === item.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                        : 'text-amber-100 hover:bg-white/10 hover:text-white'
                      }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="px-4 mt-8">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}