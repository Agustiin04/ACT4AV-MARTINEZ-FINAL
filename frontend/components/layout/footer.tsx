'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-amber-900 to-amber-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">🛒</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                  Aurea Market
                </span>
                <p className="text-amber-200 text-sm">Tu mercado dorado</p>
              </div>
            </div>
            <p className="text-amber-300 mb-6">
              Aurea Market es un e-commerce moderno y confiable que reúne productos cuidadosamente seleccionados, combinando calidad, diseño y practicidad.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-amber-800/50 rounded-full flex items-center justify-center hover:bg-amber-700 transition hover:scale-110"
                >
                  <Icon className="w-5 h-5 text-amber-200" />
                </a>
              ))}
            </div>
          </div>

          
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              Enlaces Rápidos
            </h3>
            <ul className="space-y-3">
              {['Inicio', 'Productos', 'Carrito', 'Nosotros', 'Contacto', 'FAQ'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item === 'Inicio' ? '' : item.toLowerCase()}`}
                    className="text-amber-300 hover:text-amber-100 transition flex items-center gap-2 group"
                  >
                    <div className="w-1 h-1 bg-amber-500 rounded-full opacity-0 group-hover:opacity-100"></div>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        
          <div>
            <h3 className="text-xl font-bold mb-6">Categorías Doradas</h3>
            <div className="space-y-3">
              {[
                'Electrónica Premium',
                'Moda Elegante', 
                'Hogar & Decoración',
                'Bienestar & Salud',
                'Tecnología',
                'Lujo Accesible'
              ].map((category) => (
                <div key={category} className="flex items-center gap-3 group">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                  <Link
                    href={`/products?category=${category.toLowerCase().replace(' & ', '-').replace(' ', '-')}`}
                    className="text-amber-300 hover:text-amber-100 transition"
                  >
                    {category}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          
          <div>
            <h3 className="text-xl font-bold mb-6">Contacto Áureo</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300">Av. 9 de Julio, Parana, Entre Rios</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300">+54 (343) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-400" />
                <span className="text-amber-300">contacto@aureamarket.com</span>
              </div>
            </div>

           
            <div className="mt-8">
              <h4 className="font-bold mb-3 text-amber-200">Suscríbete al Newsletter Dorado</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Tu email dorado"
                  className="flex-1 px-4 py-2 rounded-lg bg-amber-800/30 border border-amber-700 text-white placeholder-amber-400 focus:outline-none focus:border-amber-500"
                />
                <button className="bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition shadow-lg">
                  OK
                </button>
              </div>
              <p className="text-xs text-amber-400 mt-2">
                Recibe ofertas exclusivas y contenido premium
              </p>
            </div>
          </div>
        </div>

        
        <div className="border-t border-amber-800 my-12"></div>

        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-amber-400 text-sm mb-4 md:mb-0">
            © {currentYear} Aurea Market. Todos los derechos reservados.
          </div>
          <div className="flex gap-6 text-sm">
            {['Privacidad', 'Términos', 'Cookies', 'Mapa'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-amber-400 hover:text-amber-200 transition"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="mt-4 md:mt-0 text-amber-400 text-sm flex items-center gap-1">
            Hecho con <Heart className="w-4 h-4 text-amber-500 fill-amber-500" /> por Agustin
          </div>
        </div>
      </div>
    </footer>
  );
}