'use client';

import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';

const CartIcon = () => {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative p-2 rounded-xl hover:bg-amber-50 transition-colors group"
    >
      <div className="relative">
        <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-amber-600 transition-colors" />
        
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
            {totalItems > 9 ? '9+' : totalItems}
          </span>
        )}
      </div>

      <div className="absolute -bottom-10 right-0 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        Ver carrito ({totalItems})
      </div>
    </Link>
  );
};

export default CartIcon;