import React from 'react';
import { X, Filter } from 'lucide-react';

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string;
    priceRange: [number, number];
    tags: string[];
    sortBy: string;
  };
  onFilterChange: (filters: any) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="relative w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <Filter className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-bold text-gray-900">Filtrar Productos</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">

            </div>

            <div className="border-t border-gray-200 p-6">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    onFilterChange({
                      category: 'Todos',
                      priceRange: [0, 2000],
                      tags: [],
                      sortBy: 'relevant'
                    });
                  }}
                  className="flex-1 border border-amber-200 text-amber-700 px-6 py-3 rounded-xl font-semibold hover:bg-amber-50 transition-all"
                >
                  Limpiar filtros
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md"
                >
                  Aplicar filtros
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;