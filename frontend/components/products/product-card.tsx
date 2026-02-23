'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Eye, Heart, TrendingUp } from 'lucide-react';
import ProductModal from '../modals/productModal';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    stock: number;
    category: string;
    isFeatured?: boolean;
  };
  onWishlistToggle?: (id: string) => void;
}

export default function ProductCard({ product, onWishlistToggle }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Debes iniciar sesión para agregar al carrito');
      return;
    }

    setIsAdding(true);
    try {
      await addToCart({
        ...product,
        quantity: 1
      });
      toast.success('¡Producto agregado al carrito!');
    } catch (error) {
      toast.error('Error al agregar al carrito');
    } finally {
      setIsAdding(false);
    }
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    if (onWishlistToggle) onWishlistToggle(product.id);
    
    if (!isWishlisted) {
      toast.success('Agregado a favoritos');
    } else {
      toast.info('Removido de favoritos');
    }
  };

  const discount = product.stock > 50 ? 0 : product.stock < 10 ? 15 : 0;
  const finalPrice = discount ? product.price * (1 - discount / 100) : product.price;

  return (
    <>
      <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
        
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isFeatured && (
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <TrendingUp size={12} /> Destacado
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              -{discount}% OFF
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Últimas {product.stock} unidades
            </span>
          )}
        </div>

        
        <button
          onClick={handleWishlistToggle}
          className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition"
          aria-label={isWishlisted ? 'Remover de favoritos' : 'Agregar a favoritos'}
        >
          <Heart 
            size={20} 
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'} 
          />
        </button>

      
        <div 
          className="relative h-64 overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Image
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-6 py-2 rounded-full font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-50 shadow-lg"
          >
            <Eye size={16} className="inline mr-2" />
            Vista rápida
          </button>
        </div>

        
        <div className="p-5">
          
          <div className="mb-2">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {product.category}
            </span>
          </div>

          
          <h3 className="font-bold text-lg mb-2 line-clamp-1 hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

         
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">
              {product.stock} en stock
            </span>
          </div>

         
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              {discount > 0 ? (
                <>
                  <div className="text-2xl font-bold text-gray-900">
                    ${finalPrice.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-red-500">
                      Ahorras ${(product.price - finalPrice).toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-2xl font-bold text-gray-900">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className={`
                flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300
                ${product.stock === 0 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:shadow-lg'
                }
                ${isAdding ? 'opacity-75' : ''}
              `}
            >
              {isAdding ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Agregando...
                </>
              ) : product.stock === 0 ? (
                'Agotado'
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Agregar
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </>
  );
}