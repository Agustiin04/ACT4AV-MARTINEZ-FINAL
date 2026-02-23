'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart, Eye, Heart, Zap, Shield } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

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
    discount?: number;
    tags?: string[];
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, isInCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const finalPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Agregando al carrito:', product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Vista rápida:', product.id);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
       
        <div className="relative h-56 md:h-64 overflow-hidden bg-gradient-to-br from-amber-50 to-orange-50">
          
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            {product.discount && (
              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                -{product.discount}%
              </span>
            )}
            {product.isFeatured && (
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Destacado
              </span>
            )}
          </div>

         
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-md"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>

          
          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            
            {isHovered && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300" />
            )}
          </div>

          
          <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="flex gap-2">
              <button
                onClick={handleQuickView}
                className="flex-1 bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" /> Vista rápida
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:from-amber-600 hover:to-orange-600 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <ShoppingCart className="w-4 h-4" /> Agregar
              </button>
            </div>
          </div>
        </div>

        <div className="p-5">
          
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-amber-600 font-semibold bg-amber-50 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-500" />
              <span className={`text-sm font-medium ${product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-amber-600' : 'text-red-600'}`}>
                {product.stock > 10 ? 'Stock disponible' : product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
              </span>
            </div>
          </div>

         
          <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">{product.rating.toFixed(1)}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">128 reseñas</span>
          </div>

          
          <div className="flex items-center justify-between">
            <div>
              {product.discount ? (
                <>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-gray-800">
                      ${finalPrice.toFixed(2)}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-1 mt-1 px-2 py-1 bg-red-50 text-red-600 rounded-md text-xs font-semibold">
                    <Zap className="w-3 h-3" /> Ahorras ${(product.price - finalPrice).toFixed(2)}
                  </div>
                </>
              ) : (
                <span className="text-2xl font-bold text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>

         
          {product.tags && product.tags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-2">
                {product.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;