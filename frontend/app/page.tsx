
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check, Shield, Truck, CreditCard, Star, Sparkles, Quote, Award, Heart } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import Footer from '@/components/layout/footer';


const featuredProducts = [
  {
    id: "1",
    name: "Laptop Gamer Pro",
    description: "Rendimiento extremo para gaming y trabajo",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80",
    rating: 4.7,
    stock: 12,
    category: "Electrónica",
    isFeatured: true,
    discount: 15
  },
  {
    id: "2", 
    name: "Auriculares Elite",
    description: "Sonido envolvente con cancelación de ruido",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    rating: 4.5,
    stock: 25,
    category: "Electrónica",
    isFeatured: true,
    discount: 10
  },
  {
    id: "3",
    name: "Smartwatch Pro",
    description: "Tu compañero fitness y salud 24/7",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
    rating: 4.3,
    stock: 18,
    category: "Wearables",
    isFeatured: true
  },
];

const categories = [
  { name: 'Electrónica', icon: '💻', count: 42, color: 'from-blue-500 to-cyan-500' },
  { name: 'Moda', icon: '👕', count: 36, color: 'from-pink-500 to-rose-500' },
  { name: 'Hogar', icon: '🏠', count: 28, color: 'from-emerald-500 to-teal-500' },
  { name: 'Deportes', icon: '⚽', count: 19, color: 'from-orange-500 to-amber-500' },
  { name: 'Libros', icon: '📚', count: 57, color: 'from-purple-500 to-violet-500' },
  { name: 'Belleza', icon: '💄', count: 31, color: 'from-fuchsia-500 to-pink-500' },
];


const testimonials = [
  {
    id: 1,
    name: "María González",
    role: "Diseñadora UX",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b786d4d9?w=150&h=150&fit=crop&crop=face",
    content: "Aurea Market ha transformado completamente mi forma de comprar. La calidad de los productos y el servicio al cliente son excepcionales. ¡Mi tienda favorita!",
    rating: 5,
    verified: true
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    role: "Ingeniero de Software",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "Como desarrollador, valoro mucho la experiencia de usuario. Aurea Market tiene la mejor interfaz y el proceso de compra más fluido que he visto.",
    rating: 5,
    verified: true
  },
  {
    id: 3,
    name: "Ana Martínez",
    role: "Estudiante Universitaria",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content: "Los precios son increíbles para la calidad que ofrecen. Siempre encuentro ofertas exclusivas y el envío llega antes de lo esperado. ¡100% recomendado!",
    rating: 4,
    verified: true
  },
  {
    id: 4,
    name: "Roberto Sánchez",
    role: "Emprendedor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "He comprado equipos electrónicos para mi empresa y siempre superan expectativas. El soporte post-venta es de otro nivel. Aurea Market es confianza pura.",
    rating: 5,
    verified: true
  }
];


const achievements = [
  { number: "4.9/5", label: "Rating promedio", icon: "⭐" },
  { number: "98%", label: "Clientes satisfechos", icon: "😊" },
  { number: "24h", label: "Soporte activo", icon: "⏰" },
  { number: "50k+", label: "Productos vendidos", icon: "📦" }
];

export default function HomePage() {
  const [stats, setStats] = useState({ customers: 12543, products: 892, orders: 4567 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    
    const timer = setInterval(() => {
      setStats(prev => ({
        customers: prev.customers + Math.floor(Math.random() * 10),
        products: prev.products + Math.floor(Math.random() * 3),
        orders: prev.orders + Math.floor(Math.random() * 5)
      }));
    }, 3000);

    
    const testimonialTimer = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      clearInterval(testimonialTimer);
    };
  }, []);

  const handleBuyNow = (productId: string) => {
    window.location.href = `/products/${productId}?buynow=true`;
  };

  return (
    <div className="min-h-screen">
      
      <section className="relative bg-gradient-to-br from-amber-900 via-orange-900 to-rose-900 text-white overflow-hidden">
        
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFD700' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
           
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl font-bold">🛒</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold">Aurea Market</h1>
                <p className="text-amber-200 text-sm">Tu mercado dorado de productos</p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="text-sm">✨ Oferta exclusiva: 30% OFF en electrónica</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Descubre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">productos dorados</span> para tu vida
            </h1>
            
            <p className="text-xl text-amber-100 mb-8 max-w-2xl">
              Donde la calidad se encuentra con el estilo. Más de 10,000 productos premium con la garantía de excelencia que solo Aurea Market ofrece.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link
                href="/products"
                className="group bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl"
              >
                Explorar Colección
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              <button
                onClick={() => handleBuyNow("1")}
                className="bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Comprar Ahora
              </button>
            </div>

            
            <div className="grid grid-cols-3 gap-4 max-w-xl">
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stats.customers.toLocaleString()}+</div>
                <div className="text-amber-200 text-sm">Clientes dorados</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stats.products}+</div>
                <div className="text-amber-200 text-sm">Productos únicos</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl backdrop-blur-sm">
                <div className="text-2xl md:text-3xl font-bold mb-1">{stats.orders.toLocaleString()}+</div>
                <div className="text-amber-200 text-sm">Órdenes completadas</div>
              </div>
            </div>
          </div>
        </div>

       
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <div className="relative h-full w-full">
            <Image
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&q=80"
              alt="Aurea Market - Experiencia de compra premium"
              fill
              className="object-cover object-left"
              priority
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

     
      <section className="py-12 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg">
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="text-3xl font-bold text-amber-600 mb-1">{achievement.number}</div>
                <div className="text-gray-600 text-sm">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Por qué elegir Aurea Market?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Nos destacamos por ofrecer una experiencia de compra premium que va más allá de lo convencional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Calidad Certificada</h3>
              <p className="text-gray-600">Cada producto pasa por rigurosos controles de calidad para garantizar excelencia.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Truck className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Envío Express</h3>
              <p className="text-gray-600">Entrega en 24-48 horas con seguimiento en tiempo real y embalaje premium.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-amber-100">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold mb-4">Garantía Dorada</h3>
              <p className="text-gray-600">Garantía extendida de 2 años y devolución gratuita por 60 días.</p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Colección Dorada</h2>
              <p className="text-gray-600">Productos seleccionados por nuestra comunidad</p>
            </div>
            <Link 
              href="/products" 
              className="text-amber-600 hover:text-amber-800 font-semibold flex items-center gap-2"
            >
              Ver colección completa <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} />
                <div className="absolute bottom-24 right-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleBuyNow(product.id)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  >
                    Comprar Ahora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">
              <Quote className="w-4 h-4" />
              <span className="text-sm font-medium">Lo que dicen nuestros clientes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Historias Doradas</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre por qué miles de personas confían en Aurea Market para sus compras
            </p>
          </div>

          
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-amber-50 to-orange-50 shadow-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
               
                <div className="flex-shrink-0">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                    <Image
                      src={testimonials[activeTestimonial].avatar}
                      alt={testimonials[activeTestimonial].name}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <div className="flex justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < testimonials[activeTestimonial].rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <h4 className="font-bold">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-sm text-gray-600">{testimonials[activeTestimonial].role}</p>
                    {testimonials[activeTestimonial].verified && (
                      <div className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full mt-1">
                        <Check className="w-3 h-3" /> Verificado
                      </div>
                    )}
                  </div>
                </div>

                
                <div className="flex-1">
                  <div className="text-amber-600 mb-4">
                    <Quote className="w-8 h-8 opacity-50" />
                  </div>
                  <p className="text-lg md:text-xl italic text-gray-700 mb-6">
                    "{testimonials[activeTestimonial].content}"
                  </p>
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-sm text-gray-600">Experiencia Aurea Market</span>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${index === activeTestimonial ? 'bg-amber-500 w-8' : 'bg-amber-200'}`}
                  aria-label={`Ver testimonio ${index + 1}`}
                />
              ))}
            </div>

           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              {testimonials.slice(0, 2).map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 line-clamp-3">"{testimonial.content}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Explora el Mercado</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Descubre nuestras categorías doradas, cada una con productos seleccionados
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name.toLowerCase()}`}
                className="group block"
              >
                <div className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl`}>
                  <div className="text-3xl mb-3">{category.icon}</div>
                  <h3 className="font-bold text-white mb-1">{category.name}</h3>
                  <div className="text-white/80 text-sm">{category.count} productos</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gradient-to-br from-amber-500 to-orange-600">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
            
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z' fill='%23FFD700' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`
              }}
            ></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm">Exclusivo para nuevos miembros</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Únete al <span className="text-amber-300">Mercado Dorado</span>
              </h2>
              
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Regístrate hoy y recibe un <span className="font-bold text-amber-300">20% de descuento</span> en tu primera compra, acceso a ofertas exclusivas y envío gratis por un año.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="bg-white text-amber-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition shadow-lg hover:shadow-xl"
                >
                  Comenzar Gratis
                </Link>
                <Link
                  href="/products"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition"
                >
                  Ver Catálogo
                </Link>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2 justify-center">
                  <CreditCard className="w-5 h-5" />
                  <span>Pago seguro</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Truck className="w-5 h-5" />
                  <span>Envío gratis</span>
                </div>
                <div className="flex items-center gap-2 justify-center">
                  <Shield className="w-5 h-5" />
                  <span>Garantía 60 días</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <Footer />
    </div>
  );
}