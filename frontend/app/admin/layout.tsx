'use client';

import { useAuth } from '@/contexts/auth-context';
import { Package, Users, ShoppingBag, BarChart, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const router = useRouter();

  
  if (!user || user.role !== 'ADMIN') {
    router.push('/dashboard');
    return null;
  }

  const navItems = [
    { href: '/admin', icon: BarChart, label: 'Dashboard' },
    { href: '/admin/products', icon: Package, label: 'Productos' },
    { href: '/admin/users', icon: Users, label: 'Usuarios' },
    { href: '/admin/orders', icon: ShoppingBag, label: 'Pedidos' },
    { href: '/admin/settings', icon: Settings, label: 'Configuración' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-8 flex items-center">
            <Package className="h-6 w-6 mr-2" />
            Admin Panel
          </h1>
          
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="mt-auto pt-8 border-t border-gray-800">
            <div className="px-4 py-3">
              <p className="text-sm text-gray-400">Conectado como</p>
              <p className="font-medium">{user?.email}</p>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-gray-800 transition mt-2"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      
      <div className="ml-64">
        
        <header className="bg-white shadow-sm border-b">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">
                Panel de Administración
              </h2>
              <div className="flex items-center space-x-4">
                <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                  ADMIN
                </span>
              </div>
            </div>
          </div>
        </header>

        
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}