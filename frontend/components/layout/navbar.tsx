'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { ShoppingCart, User, LogOut, Package } from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">E-Shop</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-600">
              Inicio
            </Link>
            
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Productos
            </Link>
            
            <Link href="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-5 w-5 mr-1" />
              Carrito
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
                
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <span className="text-gray-700">{user.name}</span>
                </div>
                
                <button
                  onClick={logout}
                  className="flex items-center text-gray-700 hover:text-red-600"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}