'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { useCart } from '@/contexts/cart-context';
import { toast } from 'react-hot-toast';
import { Product } from '@/types';
import Button from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar al carrito');
      return;
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      stock: product.stock
    });
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 400px) 100vw, 400px"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            <ShoppingCart className="h-16 w-16" />
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="mb-2">
          <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-1">{product.name}</h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>
        
        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-500">(4.0)</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.stock > 0 ? (
              <p className="text-sm text-green-600 mt-1">{product.stock} en stock</p>
            ) : (
              <p className="text-sm text-red-600 mt-1">Agotado</p>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Link
              href={`/products/${product.id}`}
              className="p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              title="Ver detalles"
            >
              <Eye className="h-5 w-5" />
            </Link>
            
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || !user}
              className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              title={!user ? "Inicia sesión para comprar" : "Agregar al carrito"}
            >
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}