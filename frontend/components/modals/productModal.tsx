'use client';

import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';
import { X, Star, Package, Truck, Shield, CreditCard } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    rating: number;
    stock: number;
    category: string;
  };
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);


  if (!mounted) return null;
  

  if (!isOpen) return null;


  const modalRoot = document.getElementById('modal-root');
  

  if (!modalRoot) {
    console.error('modal-root not found! Rendering inline instead.');
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">

        <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
          <button onClick={onClose} className="float-right">X</button>
          <h2>{product.name}</h2>
          <p>Error: modal-root no encontrado. Por favor agrega &lt;div id="modal-root" /&gt; a tu layout.</p>
        </div>
      </div>
    );
  }

 
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
     
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-slideUp">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
        
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
              <Image
                src={product.image || '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            
            <div>
              <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
                {product.category}
              </span>
              
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < product.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="ml-2 font-bold">{product.rating.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center gap-2 mb-6">
                <Package size={20} className="text-gray-500" />
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `${product.stock} disponibles` : 'Agotado'}
                </span>
              </div>
              
              <div className="mb-8">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ${product.price.toFixed(2)}
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600">
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
}