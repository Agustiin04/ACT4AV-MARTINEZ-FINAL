'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCart, Trash2, Plus, Minus, ArrowLeft, 
  Shield, Truck, CreditCard, Sparkles, Package, 
  ChevronRight, Gift
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

export default function CartPage() {
  const router = useRouter();
  const { 
    items, 
    totalItems, 
    totalPrice, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();
  
  const [isCheckingOut, setIsCheckingOut] = useState(false);


  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalDiscount = items.reduce((sum, item) => {
    const discount = item.discount || 0;
    return sum + (item.price * (discount / 100) * item.quantity);
  }, 0);
  const shipping = totalPrice > 100 ? 0 : 9.99;
  const finalTotal = totalPrice + shipping;


  const handleCheckout = () => {
    setIsCheckingOut(true);

    setTimeout(() => {

      alert('Proceso de checkout iniciado (simulado)');
      setIsCheckingOut(false);
    }, 1500);
  };

 
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-amber-500" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tu carrito está vacío
            </h1>
            
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Parece que aún no has agregado productos dorados a tu carrito. 
              ¡Explora nuestra colección y descubre ofertas exclusivas!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Explorar productos
                <ChevronRight className="w-5 h-5" />
              </Link>
              
              <Link
                href="/"
                className="bg-white border-2 border-amber-200 text-amber-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-50 transition-all flex items-center justify-center gap-3"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al inicio
              </Link>
            </div>

            <div className="mt-16">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Productos populares
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Electrónica', count: 42, color: 'from-blue-500 to-cyan-500' },
                  { name: 'Moda', count: 36, color: 'from-pink-500 to-rose-500' },
                  { name: 'Hogar', count: 28, color: 'from-emerald-500 to-teal-500' },
                  { name: 'Deportes', count: 19, color: 'from-orange-500 to-amber-500' },
                ].map((category) => (
                  <Link
                    key={category.name}
                    href={`/products?category=${category.name.toLowerCase()}`}
                    className={`bg-gradient-to-br ${category.color} p-6 rounded-2xl text-white hover:scale-105 transition-transform duration-300 shadow-lg`}
                  >
                    <h4 className="font-bold mb-1">{category.name}</h4>
                    <p className="text-white/80 text-sm">{category.count} productos</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/30 to-white pt-20">
      
      <div className="bg-gradient-to-br from-amber-700 via-orange-700 to-rose-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                  <ShoppingCart className="w-4 h-4 text-amber-300" />
                  <span className="text-sm">Tu carrito dorado</span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Mi Carrito <span className="text-amber-300">({totalItems} productos)</span>
                </h1>
                <p className="text-amber-100">
                  Revisa tus productos antes de finalizar la compra
                </p>
              </div>

              <div className="flex items-center gap-4">
                <Link
                  href="/products"
                  className="flex items-center gap-2 text-amber-200 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Seguir comprando
                </Link>
                
                <button
                  onClick={clearCart}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Vaciar carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-amber-100 mb-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-800">
                    Productos seleccionados
                  </h2>
                  <span className="text-amber-600 font-semibold">
                    {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                  </span>
                </div>

                <div className="space-y-6">
                  {items.map((item) => {
                    const itemTotal = item.discount 
                      ? item.price * (1 - item.discount / 100) * item.quantity
                      : item.price * item.quantity;

                    return (
                      <div 
                        key={item.id} 
                        className="flex flex-col sm:flex-row gap-4 p-4 bg-gradient-to-r from-amber-50/50 to-orange-50/30 rounded-xl border border-amber-100 group hover:border-amber-200 transition-all"
                      >
                       
                        <div className="relative w-full sm:w-24 h-40 sm:h-24 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                          {item.discount && (
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded">
                              -{item.discount}%
                            </div>
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 mb-1 group-hover:text-amber-700 transition-colors">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600 mb-2">
                                {item.category}
                              </p>
                              
                              <div className="flex items-center gap-3 mb-4">
                                {item.discount ? (
                                  <>
                                    <span className="text-lg font-bold text-gray-800">
                                      ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                      ${item.price.toFixed(2)}
                                    </span>
                                    <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                                      Ahorras ${(item.price * (item.discount / 100)).toFixed(2)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-lg font-bold text-gray-800">
                                    ${item.price.toFixed(2)}
                                  </span>
                                )}
                              </div>
                            </div>

                            
                            <div className="text-right">
                              <div className="text-xl font-bold text-amber-600 mb-2">
                                ${itemTotal.toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.quantity} × ${item.discount 
                                  ? (item.price * (1 - item.discount / 100)).toFixed(2)
                                  : item.price.toFixed(2)}
                              </div>
                            </div>
                          </div>

                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-amber-100">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              
                              <span className="w-12 text-center font-semibold">
                                {item.quantity}
                              </span>
                              
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span className="text-sm font-medium">Eliminar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl border border-amber-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Envío gratis</h4>
                    <p className="text-xs text-gray-600">En compras +$100</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Garantía dorada</h4>
                    <p className="text-xs text-gray-600">60 días de devolución</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-amber-100 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm">Pago seguro</h4>
                    <p className="text-xs text-gray-600">Protegido con SSL</p>
                  </div>
                </div>
              </div>
            </div>

           
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
                  
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6">
                    <div className="flex items-center gap-3 mb-2">
                      <Package className="w-6 h-6" />
                      <h2 className="text-xl font-bold">Resumen del pedido</h2>
                    </div>
                    <p className="text-amber-100 text-sm">
                      {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
                    </p>
                  </div>

                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    {totalDiscount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Descuentos</span>
                        <span className="font-medium text-green-600">
                          -${totalDiscount.toFixed(2)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="text-gray-600">Envío</span>
                      <span className={shipping === 0 ? 'text-green-600 font-medium' : 'font-medium'}>
                        {shipping === 0 ? '¡GRATIS!' : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>

                    {shipping > 0 && (
                      <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4" />
                          <span>
                            <strong>¡Agrega ${(100 - totalPrice).toFixed(2)} más</strong> para envío gratis
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <div className="text-right">
                          <div className="text-2xl text-amber-600">
                            ${finalTotal.toFixed(2)}
                          </div>
                          <div className="text-sm text-gray-500 font-normal">
                            IVA incluido
                          </div>
                        </div>
                      </div>
                    </div>

                    
                    <div className="pt-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Código de cupón"
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                        <button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all">
                          Aplicar
                        </button>
                      </div>
                    </div>

                    
                    <button
                      onClick={handleCheckout}
                      disabled={isCheckingOut}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 mt-6"
                    >
                      {isCheckingOut ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          Proceder al pago
                          <ChevronRight className="w-5 h-5" />
                        </>
                      )}
                    </button>

                   
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 text-center mb-3">
                        Métodos de pago aceptados
                      </p>
                      <div className="flex justify-center gap-3">
                        {['Visa', 'Mastercard', 'PayPal', 'MercadoPago'].map((method) => (
                          <div
                            key={method}
                            className="w-10 h-6 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600"
                          >
                            {method}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                
                <div className="mt-4 bg-white rounded-2xl border border-amber-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm">
                        Compra 100% segura
                      </h4>
                      <p className="text-xs text-gray-600">
                        Tus datos están protegidos con encriptación SSL
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}