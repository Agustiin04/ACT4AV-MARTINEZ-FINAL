'use client';

import { useCart } from '@/contexts/cart-context';
import Button from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { items, total, itemCount, removeFromCart, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-12 w-12 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-8">
              ¡Añade algunos productos increíbles para comenzar a comprar!
            </p>
            <Link href="/products">
              <Button variant="primary" size="lg" fullWidth>
                Ver Productos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Tu Carrito</h1>
        <p className="text-gray-600 mb-8">
          Tienes {itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu carrito
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="relative w-full sm:w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 128px) 100vw, 128px"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        <ShoppingBag className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-gray-600">Stock disponible: {item.stock}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition"
                        title="Eliminar"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition"
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <span className="text-gray-500">x ${item.price.toFixed(2)}</span>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-800">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)} c/u
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={clearCart}
              >
                Vaciar Carrito
              </Button>
              
              <Link href="/products">
                <Button variant="secondary">
                  Seguir Comprando
                </Button>
              </Link>
            </div>
          </div>

          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Resumen del Pedido</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Impuestos</span>
                  <span>${(total * 0.21).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl text-blue-600">
                      ${(total * 1.21).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">IVA incluido (21%)</p>
                </div>
              </div>
              
              <Button variant="primary" size="lg" fullWidth className="mb-4">
                Proceder al Pago
                <ArrowRight className="ml-2 h-5 w-5 inline" />
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  ✅ Pago 100% seguro<br />
                  🔒 Tus datos están protegidos
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">Métodos de pago aceptados</h3>
                <div className="flex space-x-2">
                  {['Visa', 'Mastercard', 'PayPal', 'MercadoPago'].map((method) => (
                    <div key={method} className="bg-gray-100 px-3 py-1.5 rounded text-sm">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}