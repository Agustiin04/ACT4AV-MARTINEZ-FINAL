'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X, Home, Package, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { itemCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`
      fixed top-0 w-full z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-amber-100' 
        : 'bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200'
      }
    `}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
         
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-amber-200/50 transition-shadow">
              <span className="text-xl font-bold text-white">🛒</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Aurea Market
              </span>
              <span className="text-xs text-amber-600 font-medium">Tu mercado dorado</span>
            </div>
          </Link>

          
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
            >
              <Home className="w-4 h-4" />
              Inicio
            </Link>
            
            <Link 
              href="/products" 
              className="flex items-center gap-2 text-amber-700 hover:text-amber-900 font-medium transition-colors"
            >
              <Package className="w-4 h-4" />
              Productos
            </Link>
            
            {user?.role === 'admin' && (
              <Link 
                href="/admin" 
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
              >
                Panel Admin
              </Link>
            )}

            
            <Link href="/cart" className="relative group">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center hover:from-amber-200 hover:to-orange-200 transition-all">
                <ShoppingCart className="w-5 h-5 text-amber-700" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>

            
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center gap-2 bg-amber-50 px-3 py-2 rounded-full">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-amber-800 font-medium">{user.name?.split(' ')[0]}</span>
                  </div>
                  <button
                    onClick={logout}
                    className="text-amber-600 hover:text-amber-800 font-medium"
                  >
                    Salir
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    href="/login"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                  >
                    Ingresar
                  </Link>
                  <Link
                    href="/register"
                    className="border-2 border-amber-500 text-amber-600 px-6 py-2 rounded-lg font-semibold hover:bg-amber-50 transition"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>

          
          <button
            className="md:hidden w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center hover:bg-amber-200 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5 text-amber-700" /> : <Menu className="w-5 h-5 text-amber-700" />}
          </button>
        </div>

        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-amber-100 animate-slideDown">
            <div className="space-y-2">
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Inicio</span>
              </Link>
              
              <Link
                href="/products"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <Package className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Productos</span>
              </Link>
              
              <Link
                href="/cart"
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-amber-50 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5 text-amber-600" />
                <span className="font-medium text-amber-800">Carrito</span>
                {itemCount > 0 && (
                  <span className="ml-auto bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>

              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className="block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-lg font-semibold text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel de Administración
                </Link>
              )}

              <div className="pt-4 border-t border-amber-100">
                {user ? (
                  <>
                    <div className="flex items-center gap-3 px-4 py-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-amber-900">{user.name}</p>
                        <p className="text-sm text-amber-600">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-amber-600 hover:text-amber-800 px-4 py-3 text-center"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      className="block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-3 rounded-lg font-semibold text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      href="/register"
                      className="block border-2 border-amber-500 text-amber-600 px-4 py-3 rounded-lg text-center hover:bg-amber-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Crear Cuenta
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}